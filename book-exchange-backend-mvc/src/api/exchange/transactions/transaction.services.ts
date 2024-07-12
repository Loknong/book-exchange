import { PrismaClient, Prisma, TransactionStatus } from "@prisma/client";
import {
  validateStateError,
  validateStateTransition,
} from "../utils/validateStateChange";

// Create Transactions
export const createTransaction = async (
  prisma: Prisma.TransactionClient,
  offerId: number
) => {
  return await prisma.transactions.create({
    data: {
      offerId,
    },
  });
};

// Get Transactions
export const getTransacitonById = async (
  prisma: PrismaClient,
  transactionId: number
) => {
  const transaction = await prisma.transactions.findUnique({
    where: { id: transactionId },
    select: {
      id: true,
      offerId: true,
      offer: {
        select: {
          status: true,
          offeredById: true,
          offeredBy: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              username: true,
            },
          },
          offeredToId: true,
          offeredTo: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              username: true,
            },
          },
        },
      },
      status: true,
      payments: true,
      userTransactionStatus: true,
      adminManagement: true,
      updatedAt: true,
      createdAt: true,
    },
    // include: {
    //   offer: true,
    //   adminManagement: true,
    //   payments: true,
    //   userTransactionStatus: true,
    // },
  });

  return transaction;
};

// Update Transaction
export const updateTransaction = async (
  prisma: Prisma.TransactionClient,
  transacionId: number,
  status: TransactionStatus
) => {
  const transacion = await prisma.transactions.findUnique({
    where: { id: transacionId },
  });

  if (!transacion) throw new Error("Transaction does not exist");

  // Status is same way
  const isAllowed = validateStateTransition(
    "TransactionStatus",
    transacion.status,
    status
  );
  if (!isAllowed)
    throw new Error(
      validateStateError("Offers", "OfferStatus", transacion.status)
    );

  return prisma.transactions.update({
    where: { id: transacionId },
    data: { status },
  });
};
