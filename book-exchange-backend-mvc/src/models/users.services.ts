import { PrismaClient } from "@prisma/client";
import {
  CreateUserRequest,
  UpdateUserRequest,
} from "../types/base/users.types";

export const createUser = async (
  prisma: PrismaClient,
  data: CreateUserRequest
) => {
  const user = await prisma.users.create({ data });
  return user;
};

export const getUserById = async (prisma: PrismaClient, id: number) => {
  const user = await prisma.users.findUnique({ where: { id } });
  return user;
};

export const updateUser = async (
  prisma: PrismaClient,
  id: number,
  data: UpdateUserRequest
) => {
  const user = await prisma.users.update({ where: { id }, data });
  return user;
};

export const deleteUser = async (prisma: PrismaClient, id) => {
  const user = await prisma.users.delete({ where: { id } });
  return user;
};
