import { PrismaClient } from "@prisma/client";
import { PrismaTransactionClient } from "@src/types/utils/primaAlias.types";
import { CreateTransactionRequest, UpdateTransactionRequest } from "@src/types";

export const createTransaction = async (
  prisma: PrismaTransactionClient,
  data: CreateTransactionRequest
) => {
  const transaction = await prisma.transactions.create({ data });
  return transaction;
};

export const getTransacitonById = async (prisma: PrismaTransactionClient, id: number) => {
  const transaction = await prisma.transactions.findUnique({ where: { id } });

  return transaction;
};

export const updateTransaction = async (
  prisma: PrismaTransactionClient,
  id: number,
  data: UpdateTransactionRequest
) => {
  const transaction = await prisma.transactions.update({ where: { id }, data });
  return transaction;
};

export const deleteTransaciton = async (prisma: PrismaTransactionClient, id: number) => {
  const transaction = await prisma.transactions.delete({ where: { id } });
  return transaction;
};
