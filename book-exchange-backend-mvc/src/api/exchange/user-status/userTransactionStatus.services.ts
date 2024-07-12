import { PrismaClient, Prisma, UserTranStatus } from "@prisma/client";
import {
  validateStateError,
  validateStateTransition,
} from "../utils/validateStateChange";

interface CreateUserTransaction {
  userId: number;
  transactionId: number;
}

interface GetUserTransactionWhere {
  userId?: number;
  userTransactionId?: number;
  transactionId?: number;
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

// Get User Transactions
export const getUserTransaction = async (
  prisma: PrismaClient,
  where: GetUserTransactionWhere
) => {
  const transaction = await prisma.userTransactionStatus.findMany({
    where: {
      id: where.userTransactionId ? where.userTransactionId : undefined,
      userId: where.userId ? where.userId : undefined,
      transactionId: where.transactionId ? where.transactionId : undefined,
    },
    include: {
      user: {
        include: {
          payments: true,
        },
      },
    },
  });
  const modifiedTransactions = transaction.map((transaction) => {
    const payment = transaction.user.payments[0];
    const user = {
      firstName: transaction.user.firstName,
      lastName: transaction.user.lastName,
      username: transaction.user.username,
      email: transaction.user.email,
      //   payment: payment
    };
    return {
      ...transaction,
      user,
      payment,
    };
  });
  console.log("UserTransactionStatus", modifiedTransactions);

  return modifiedTransactions;
};

// Update User Transaction Status
export const updateUserTransaction = async (
  prisma: Prisma.TransactionClient,
  transactionId: number,
  userId: number,
  status: UserTranStatus
) => {
  // Check transaction is not canceld or completed
  const transaction = await prisma.transactions.findFirst({
    where: { id: transactionId },
  });
  console.log("aaaa", transaction);

  if (transaction?.status === "CANCELED")
    throw new Error(
      `Transaction is already ${transaction?.status} by someone, Cant update user status`
    );

  // find user status row isExist
  const isExist = await prisma.userTransactionStatus.findMany({
    where: {
      AND: [{ transactionId }, { userId }],
    },
  });
  console.log("isExist", isExist);

  if (!isExist) throw new Error("User Status row does not exist!!");

  // allowed to update ?
  const isAllowed = validateStateTransition(
    "UserTransactionStatus",
    isExist[0].status,
    status
  );

  console.log("isAllowed", isAllowed);

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
