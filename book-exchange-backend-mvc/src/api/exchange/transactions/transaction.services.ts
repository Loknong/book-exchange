import { PrismaClient } from "@prisma/client";

// Create Transactions
export const createTransaction = async (
  prisma: PrismaClient,
  offerId: number
) => {
  const transacion = await prisma.transactions.create({
    data: {
      offerId,
    },
  });

  return transacion;
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
export const updateTransaction = async (prisma:PrismaClient, ) => {

};
