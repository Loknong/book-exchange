import { Prisma, PrismaClient } from "@prisma/client";
import { sendNotification } from "@src/api/notifications/notification.services";
import { logAction } from "@src/api/log/log.services";
import { createTransaction } from "../../transactions/transaction.services";
import * as UserStatus from "../../user-status/userTransactionStatus.services";

interface createTransaction {
  offerId: number;
}
interface userId {
  offeredById: number;
  offeredToId: number;
}
interface createUserTransaction {
  userId: userId;
  transactionId: number;
}

export const handleOfferAccepted = async (
  prismaTransaction: Prisma.TransactionClient,
  createTransactionData: createTransaction,
  createUserTransactionData: createUserTransaction
) => {
  const transaction = await createTransaction(
    prismaTransaction,
    createTransactionData.offerId
  );

  const userTransaction = await UserStatus.createUserTransaction(
    prismaTransaction,
    [
      {
        userId: createUserTransactionData.userId.offeredById,
        transactionId: createUserTransactionData.transactionId,
      },
      {
        userId: createUserTransactionData.userId.offeredToId,
        transactionId: createUserTransactionData.transactionId,
      },
    ]
  );

  await sendNotification(
    createUserTransactionData.userId.offeredById,
    "Transaction created, awaiting confirmation"
  );
  await sendNotification(
    createUserTransactionData.userId.offeredToId,
    "Transaction created, awaiting confirmation"
  );
  await logAction("Transaction Created", transaction.id);
  return { transactionCreate: transaction, userTransaction };
};

export const handleOfferRejected = async (
  createUserTransactionData: createUserTransaction
) => {
  await sendNotification(
    createUserTransactionData.userId.offeredById,
    "Your offer was rejected"
  );
  await logAction(
    "Offer Rejected",
    createUserTransactionData.userId.offeredById
  );
};
