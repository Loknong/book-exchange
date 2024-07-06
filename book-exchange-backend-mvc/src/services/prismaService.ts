import { PrismaClient } from "@prisma/client";
import { getConnectionCheckById } from "../models/connectionCheck.services";
import { createUser, getUserById, getUsers } from "@src/models/users.services";
const prisma = new PrismaClient();

export const testPrismaConnection = async () => {
  try {
    const feedbackGet = await getUserById(prisma, 1);
    return {
      message: "Database connection successful.",
      feedbackGet: feedbackGet,
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error." };
  }
};

export const testFind = async () => {
  try {
    const data = await getUsers(prisma);
    return { message: "successful to get Users", users: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error." };
  }
};


export default prisma;
