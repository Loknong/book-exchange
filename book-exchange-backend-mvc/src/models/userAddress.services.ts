import { PrismaClient } from "@prisma/client";
import { PrismaTransactionClient } from "@src/types/utils/primaAlias.types";
import { CreateUserAddressRequest, UpdateUserAddressRequest } from "@src/types";

export const createUserAdderss = async (
  prisma: PrismaTransactionClient,
  data: CreateUserAddressRequest
) => {
  const userAddress = await prisma.userAddress.create({ data });
  return userAddress;
};

export const getUserAddressById = async (prisma: PrismaTransactionClient, id: number) => {
  const userAddress = await prisma.userAddress.findUnique({ where: { id } });
  return userAddress;
};

export const updateUserAddress = async (
  prisma: PrismaTransactionClient,
  id: number,
  data: UpdateUserAddressRequest
) => {
  const userAddress = await prisma.userAddress.update({ where: { id }, data });
  return userAddress;
};

export const deleteUserAddress = async (prisma: PrismaTransactionClient, id: number) => {
  const userAddress = await prisma.userAddress.delete({ where: { id } });
  return userAddress;
};
