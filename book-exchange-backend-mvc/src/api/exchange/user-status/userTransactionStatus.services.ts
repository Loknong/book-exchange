import { PrismaClient, Prisma, UserTranStatus } from "@prisma/client";
import {
  validateStateError,
  validateStateTransition,
} from "../utils/validateStateChange";

interface CreateUserTransaction {
  userId: number;
  transactionId: number;
}

// Create User Transaciton Status
export const createUserTransaction = async (
  prisma: Prisma.TransactionClient,
  data: CreateUserTransaction[]
) => {
  return await prisma.userTransactionStatus.createMany({
    data,
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

// Update User Transaction Status
export const updateUserTransaction = async (
  prisma: Prisma.TransactionClient,
  transactionId: number,
  userId: number,
  status: UserTranStatus
) => {
  // find user status row isExist
  const isExist = await prisma.userTransactionStatus.findMany({
    where: {
      transactionId,
      userId,
    },
  });

  if (!isExist) throw new Error("User Status row does not exist!!");

  // allowed to update ?
  const isAllowed = validateStateTransition(
    "UserTransactionStatus",
    isExist[0].status,
    status
  );

  if (!isAllowed)
    throw new Error(
      validateStateError(
        "UserTransactionStatus",
        "UserTransactionStatus",
        isExist[0].status
      )
    );

  return prisma.userTransactionStatus.updateMany({
    where: {
      AND: [
        {
          transactionId,
        },
        { userId },
      ],
    },
    data: {
      status,
    },
  });
};
