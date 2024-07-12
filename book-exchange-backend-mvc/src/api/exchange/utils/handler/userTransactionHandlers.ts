import {
  Prisma,
  PrismaClient,
  TransactionStatus,
  UserTranStatus,
} from "@prisma/client";
import { sendNotification } from "@src/api/notifications/notification.services";
import { logAction } from "@src/api/log/log.services";
import * as UserStatus from "../../user-status/userTransactionStatus.services";
import * as Transaction from "../../transactions/transaction.services";

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

  // Check both users are Comfirmed
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
