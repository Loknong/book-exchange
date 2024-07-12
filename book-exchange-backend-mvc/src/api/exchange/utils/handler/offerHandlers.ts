import { Prisma, PrismaClient } from "@prisma/client";
import { sendNotification } from "@src/api/notifications/notification.services";
import { logAction } from "@src/api/log/log.services";
import { createTransaction } from "../../transactions/transaction.services";
import * as UserStatus from "../../user-status/userTransactionStatus.services";

export const handleOfferAccepted = async (
  prismaTransaction: Prisma.TransactionClient,
  offerId: number,
  offeredById: number,
  offeredToId: number
) => {
  const transaction = await createTransaction(prismaTransaction, offerId);

  if (!transaction) throw new Error("Create transacion not success.");

  const userTransaction = await UserStatus.createUserTransaction(
    prismaTransaction,
    [
      {
        userId: offeredById,
        transactionId: transaction.id,
      },
      {
        userId: offeredToId,
        transactionId: transaction.id,
      },
    ]
  );

  if (userTransaction.count === 0)
    throw new Error("Update user transaction status not success");

  await sendNotification(
    offeredById,
    "Transaction created, awaiting confirmation"
  );
  await sendNotification(
    offeredToId,
    "Transaction created, awaiting confirmation"
  );
  await logAction("Transaction Created", transaction.id);

  return { transactionCreate: transaction, userTransaction };
};

export const handleOfferRejected = async (offeredById: number) => {
  await sendNotification(offeredById, "Your offer was rejected");
  await logAction("Offer Rejected", offeredById);
};
