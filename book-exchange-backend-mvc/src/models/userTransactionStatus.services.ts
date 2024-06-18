import { PrismaClient } from "@prisma/client";
import { PrismaTransactionClient } from "@src/types/utils/primaAlias.types";
import {
  CreateUserTransactionStatusRequest,
  UpdateUserTransactionStatusRequest,
} from "@src/types";

export const createUserTransactionStatus = async (
  prisma: PrismaTransactionClient,
  data: CreateUserTransactionStatusRequest
) => {
  const userTransacitonStatus = await prisma.userTransactionStatus.create({
    data,
  });

  return userTransacitonStatus;
};

export const getUserTransacitonStatusById = async (
  prisma: PrismaTransactionClient,
  id: number
) => {
  const userTransacitonStatus = await prisma.userTransactionStatus.findUnique({
    where: { id },
  });
  return userTransacitonStatus;
};

export const updateUserTransactionStatus = async (
  prisma: PrismaTransactionClient,
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
  prisma: PrismaTransactionClient,
  id: number
) => {
  const userTransacitonStatus = await prisma.userTransactionStatus.delete({
    where: { id },
  });
};
