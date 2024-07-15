import {
  Prisma,
  PrismaClient,
  TransactionStatus,
  PaymentStatus,
  UserTranStatus,
} from "@prisma/client";
import { sendNotification } from "@src/api/notifications/notification.services";
import { logAction } from "@src/api/log/log.services";
import * as UserStatus from "../../user-status/userTransactionStatus.services";
import * as Transaction from "../../transactions/transaction.services";
import * as AdminServices from "../../admin/admin.services";

export const handleCanceledCase = async (
  prismaTransaction: Prisma.TransactionClient,
  transactionId: number,
  status: TransactionStatus
) => {
  const transaction = await prismaTransaction.transactions.update({
    where: { id: transactionId },
    data: { status },
  });

  const userIds = await prismaTransaction.transactions.findUnique({
    where: { id: transactionId },
    select: {
      offer: {
        select: {
          offeredById: true,
          offeredToId: true,
        },
      },
    },
  });

  if (!userIds || !userIds.offer) {
    throw new Error("Transaction not found or associated offer not found");
  }

  const { offeredById, offeredToId } = userIds.offer;

  await sendNotification(offeredById, "Transaction canceled");
  await sendNotification(offeredToId, "Transaction canceled");
  await logAction("Transaction Canceled", transaction.id);

  return { offeredById, offeredToId };
};

export const ConfirmedCase = async (
  prismaTransaction: Prisma.TransactionClient,
  transactionId: number,
  userId: number,
  status: TransactionStatus
  //   userStatus: UserTranStatus
) => {
  console.log("Confirm Case`");
  console.log("TransaciotnId", transactionId);

  // Check both users are
  const confirmTransactions =
    await prismaTransaction.userTransactionStatus.findMany({
      where: { AND: [{ transactionId }, { status: "CONFIRMED" }] },
    });
  console.log("Transaction Confirm", confirmTransactions);

  let transactionResult = null;
  let paymentResult = [];
  let message = null;
  let transactionAfterPaymentCreate = null;
  let updateUserStateAfterTransaciton = null;

  if (confirmTransactions.length === 0) {
    throw new Error("Update transaction not successful.");
  } else if (confirmTransactions.length === 1) {
    message = "Update User transaction success, wait another user confirm.";
  } else if (confirmTransactions.length === 2) {
    transactionResult = await Transaction.updateTransaction(
      prismaTransaction,
      transactionId,
      status
    );

    for (const userTransaction of confirmTransactions) {
      // Functio to Create Amount implement later.
      const amount = Math.floor(Math.random() * 100);
      const payment = await prismaTransaction.payments.create({
        data: {
          status: "PENDING",
          amount,
          userId: userTransaction.userId,
          transactionId,
          evidence: "",
        },
      });
      paymentResult.push(payment);
    }

    transactionAfterPaymentCreate = await Transaction.updateTransaction(
      prismaTransaction,
      transactionId,
      "PAYMENT_PENDING"
    );
    updateUserStateAfterTransaciton =
      await prismaTransaction.userTransactionStatus.updateMany({
        where: { transactionId },
        data: {
          status: "USER_PAYMENT_PENDING",
        },
      });
  } else {
    throw new Error("Something went wrong with user status");
  }

  await sendNotification(
    userId,
    "Payment details created. Please proceed with the payment."
  );
  await logAction("Transaction confirmed and payment created", transactionId);
  return {
    message,
    transactionResult,
    paymentResult,
    transactionAfterPaymentCreate,
    updateUserStateAfterTransaciton,
  };
};

export const UserUpdatePayment = async (
  prismaTransaction: Prisma.TransactionClient,
  transactionId: number,
  userId: number,
  evidenceUrl: string
) => {
  console.log("User Update Payment Evidence case");
  console.log("TransactionId", transactionId);

  let message = null;
  let adminResult = null;
  let transactionResult = null;

  // Upload Image when Process is complete

  // Stamp evidence image to payment.evidence
  const payment = await prismaTransaction.payments.updateMany({
    where: {
      AND: [
        {
          transactionId,
        },
        {
          userId,
        },
      ],
    },
    data: {
      evidence: evidenceUrl,
    },
  });

  // Notif and Loggign
  await sendNotification(userId, "Evidence from this user was Upload.");
  await logAction(
    `${userId} in ${transactionId} upload payment evidence`,
    transactionId
  );

  // Function that let admin know this payment evidence upload

  // Check admin status for not duplicate job
  const haveAdminStatus = await prismaTransaction.adminManagement.findMany({
    where: {
      AND: [{ transactionId }, { status: "CHECKING_PAYMENT_EVIDENCE" }],
    },
  });
  // if else if
  if (haveAdminStatus.length === 0) {
    throw new Error("Something wrong cant find anyuser");
  } else if (haveAdminStatus.length === 1) {
    message = "Upload payment evidence success, wait admin check the evidence.";
    adminResult = await prismaTransaction.adminManagement.create({
      data: {
        status: "CHECKING_PAYMENT_EVIDENCE",
        transactionId,
        details: "",
      },
    });
    transactionResult = await prismaTransaction.transactions.update({
      where: {
        id: transactionId,
      },
      data: {
        status: "PAYMENT_IN_PROGRESS",
      },
    });
  } else {
    throw new Error("Something wrong with usersTransaction status");
  }

  return {
    message,
    payment,
    adminResult,
    transactionResult,
  };

  // END
};

export const PaymentSuccessCase = async (
  prismaTransaction: Prisma.TransactionClient,
  transactionId: number,
  userId: number
  // status: PaymentStatus
  //   userStatus: UserTranStatus
) => {
  console.log("PaymentSuccessCase`");
  console.log("TransactionId", transactionId);

  // Update Payment to Completed for that user
  const payment = await prismaTransaction.payments.updateMany({
    where: {
      AND: [{ transactionId }, { userId }],
    },
    data: { status: "COMPLETED" },
  });

  // Check number of users where UserTrnsactionStatus = "PAYMENT_SUCCESS" so we can go next processs or doing in this process wait another user
  const userPaySuccess = await prismaTransaction.userTransactionStatus.findMany(
    {
      where: { AND: [{ transactionId }, { status: "PAYMENT_SUCCESS" }] },
    }
  );
  console.log("User payment is success", userPaySuccess);

  let transactionResult = null;
  let paymentResult = [];
  let message = null;
  let transactionAfterPaymentCreate = null;
  let updateUserStateAfterTransaciton = null;
  let adminManagement = null;

  if (userPaySuccess.length === 0) {
    throw new Error("Update userTransaciton not successful.");
  } else if (userPaySuccess.length === 1) {
    message = "Update User transaction success, wait another user confirm.";
    const anotherUserId = await prismaTransaction.transactions.findMany({
      where: {
        id: transactionId,
      },
      include: {
        userTransactionStatus: {
          select: {
            userId: true,
          },
          where: {
            status: "WAITING_CHECK_EVIDENCE",
          },
        },
      },
    });
    await sendNotification(
      anotherUserId[0].userTransactionStatus[0].userId,
      "Other user was pay complete, Now your turn to complete the payment."
    );
  } else if (userPaySuccess.length === 2) {
    transactionResult = await Transaction.updateTransaction(
      prismaTransaction,
      transactionId,
      "PAYMENT_COMPLETED"
    );

    adminManagement = await AdminServices.updateAdminManagement(
      prismaTransaction,
      transactionId,
      "CHECKED_PAYMENT_COMPLETED",
      ""
    );
    await sendNotification(userId, "Admin check complete.");
  } else {
    throw new Error("Something went wrong with user status");
  }

  await sendNotification(
    userId,
    "Payment details created. Please proceed with the payment."
  );
  await logAction("Transaction confirmed and payment created", transactionId);
  return {
    message,
    transactionResult,

    transactionAfterPaymentCreate,
    updateUserStateAfterTransaciton,
  };
};

export const PaymentFailCase = async (
  prismaTransaction: Prisma.TransactionClient,
  transactionId: number,
  userId: number
) => {
  // After update to payment failed for our, then check is other user complete payment or not
  const getUserIds = await prismaTransaction.transactions.findUnique({
    where: { id: transactionId },
    select: {
      offer: {
        select: {
          offeredById: true,
          offeredToId: true,
        },
      },
    },
  });

  if (!getUserIds || !getUserIds.offer) {
    throw new Error("Transaction not found or associated offer not found");
  }

  const { offeredById, offeredToId } = getUserIds.offer;
  const otherUserId = offeredById === userId ? offeredToId : offeredById;

  // Check the status of the other user
  const otherUserTransactionStatus =
    await prismaTransaction.userTransactionStatus.findMany({
      where: {
        AND: [{ transactionId }, { userId }],
      },
    });

  if (
    otherUserTransactionStatus &&
    otherUserTransactionStatus[0].status === "PAYMENT_SUCCESS"
  ) {
    // Perform the refund process for the other user
    // await refundProcessForUser(prismaTransaction, otherUserId, transactionId);
  }

  // Update the payment status to FAILED for the user
  await prismaTransaction.payments.updateMany({
    where: {
      transactionId: transactionId,
      userId: userId,
    },
    data: {
      status: "FAILED",
    },
  });

  // Update AdminManagement status to CHECKED_PAYMENT_COMPLETED
  await prismaTransaction.adminManagement.updateMany({
    where: {
      transactionId: transactionId,
    },
    data: {
      status: "CHECKED_PAYMENT_COMPLETED",
    },
  });

  // Update the transaction status to PAYMENT_FAILED
  await prismaTransaction.transactions.update({
    where: { id: transactionId },
    data: { status: "PAYMENT_FAILED" },
  });

  await sendNotification(offeredById, "Transaction canceled");
  await sendNotification(offeredToId, "Transaction canceled");
  await logAction("Transaction Canceled", transactionId);

  return { offeredById, offeredToId };
};

export const ReceivedAddress = async (
  prismaTransaction: Prisma.TransactionClient,
  transactionId: number,
  evidenceOfferedBy?: string,
  evidenceOfferedTo?: string
) => {
  // await prismaTransaction.transactionDetails.updateMany({
  //   where: { transactionId },
  //   data: {
  //     adminSendingEvidenceToOfferedBy: evidenceOfferedBy,
  //     adminSendingEvidenceToOfferedTo: evidenceOfferedTo,
  //   },
  // });

  const transaction = await prismaTransaction.transactions.update({
    where: { id: transactionId },
    data: { status: "ADDRESS_SENT" },
  });

  const adminManagement = await prismaTransaction.adminManagement.update({
    where: { transactionId },
    data: { status: "SENDING_ADDRESS" },
  });

  await sendNotification(transactionId, "Address sent");
  await logAction("Address sent to users", transactionId);

  return { transaction, adminManagement };
};

export const SendingBook = async (
  prismaTransaction: Prisma.TransactionClient,
  transactionId: number,
  userId: number,
  imageUrl?: string
) => {
  // We need to update evidence in TransactionDetails
  // So we need to know if this userId is from offeredById or offeredToId
  const getUserIds = await prismaTransaction.transactions.findUnique({
    where: { id: transactionId },
    select: {
      offer: {
        select: {
          offeredById: true,
          offeredToId: true,
        },
      },
    },
  });

  if (!getUserIds || !getUserIds.offer) {
    throw new Error("Transaction not found or associated offer not found");
  }

  const { offeredById, offeredToId } = getUserIds.offer;
  let updateData = {};

  if (offeredById === userId) {
    updateData = { offeredBySendingEvidence: imageUrl };
  } else if (offeredToId === userId) {
    updateData = { offeredToSendingEvidence: imageUrl };
  } else {
    throw new Error("User not associated with this transaction");
  }

  await prismaTransaction.transactionDetails.updateMany({
    where: { transactionId },
    data: updateData,
  });

  const userTransaction =
    await prismaTransaction.userTransactionStatus.updateMany({
      where: {
        AND: [
          {
            userId,
          },
          {
            transactionId,
          },
        ],
      },
      data: { status: "SENDING_BOOK" },
    });

  const adminManagement = await prismaTransaction.adminManagement.update({
    where: { transactionId },
    data: { status: "WAITING_BOOK" },
  });

  await sendNotification(userId, "Book sent by user");
  await logAction("Book sent by user", transactionId);

  return { userTransaction, adminManagement };
};
