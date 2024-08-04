import { PrismaTransactionClient } from "@src/types/utils/primaAlias.types";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
} from "../types/base/users.types";

// export type PrismaTransactionClient = PrismaClient | Prisma.TransactionClient;

export const createUser = async (
  prisma: PrismaTransactionClient,
  data: CreateUserRequest
): Promise<UserResponse> => {
  console.log(data);
  if (!data.role) throw new Error("Not");

  const user = await prisma.users.create({ data });

  console.log(user);

  return user;
};

export const getUsers = async (prisma: PrismaTransactionClient) => {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      credit: true,
      addresses: true,
      profilePictures: {
        where: {
          isActive: true,
        },
        select: {
          name: true,
        },
      },
    },
  });

  return users;
};

export const getUserById = async (
  prisma: PrismaTransactionClient,
  id: number
) => {
  const user = await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      credit: true,
      profilePictures: {
        where: {
          isActive: true,
        },
        select: {
          name: true,
        },
      },
    },
  });
  return user;
};

export const updateUser = async (
  prisma: PrismaTransactionClient,
  id: number,
  data: Partial<UpdateUserRequest>
) => {
  const user = await prisma.users.update({ where: { id }, data });
  return user;
};

export const deleteUser = async (
  prisma: PrismaTransactionClient,
  id: number
) => {
  const user = await prisma.users.delete({ where: { id } });
  return user;
};
