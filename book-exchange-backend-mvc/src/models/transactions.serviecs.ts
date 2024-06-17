import { PrismaClient } from "@prisma/client";
import { CreateTransactionRequest, UpdateTransactionRequest } from "@src/types";

export const createTransaction = async (
  prisma: PrismaClient,
  data: CreateTransactionRequest
) => {
  const transaction = await prisma.transactions.create({ data });
  return transaction;
};

export const getTransacitonById = async (prisma: PrismaClient, id: number) => {
  const transaction = await prisma.transactions.findUnique({ where: { id } });

  return transaction;
};

export const updateTransaction = async (
  prisma: PrismaClient,
  id: number,
  data: UpdateTransactionRequest
) => {
  const transaction = await prisma.transactions.update({ where: { id }, data });
  return transaction;
};

export const deleteTransaciton = async (prisma: PrismaClient, id: number) => {
  const transaction = await prisma.transactions.delete({ where: { id } });
  return transaction;
};
