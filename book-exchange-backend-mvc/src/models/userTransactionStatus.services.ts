import { PrismaClient } from "@prisma/client";
import {
  CreateUserTransactionStatusRequest,
  UpdateUserTransactionStatusRequest,
} from "@src/types";

export const createUserTransactionStatus = async (
  prisma: PrismaClient,
  data: CreateUserTransactionStatusRequest
) => {
  const userTransacitonStatus = await prisma.userTransactionStatus.create({
    data,
  });

  return userTransacitonStatus;
};

export const getUserTransacitonStatusById = async (
  prisma: PrismaClient,
  id: number
) => {
  const userTransacitonStatus = await prisma.userTransactionStatus.findUnique({
    where: { id },
  });
  return userTransacitonStatus;
};

export const updateUserTransactionStatus = async (
  prisma: PrismaClient,
  id: number,
  data: UpdateUserTransactionStatusRequest
) => {
  const userTransacitonStatus = await prisma.userTransactionStatus.update({
    where: { id },
    data,
  });
  return userTransacitonStatus;
};

export const deleteUserTransactionStatus = async (
  prisma: PrismaClient,
  id: number
) => {
  const userTransacitonStatus = await prisma.userTransactionStatus.delete({
    where: { id },
  });
};


