import { PrismaClient } from "@prisma/client";
import { getConnectionCheckById } from "../models/connectionCheck.services";
import { createUser, getUserById, getUsers } from "@src/models/users.services";
const prisma = new PrismaClient();

export const testPrismaConnection = async () => {
  try {
    // const connectionCheck = await prisma.connectionChecks.findMany()
    // const connectionCheck = await getConnectionCheckById (prisma, 1)
    const connectionCheck = await createUser(prisma, {
      firstName: "Jukkapan2",
      lastName: "Kongjun2",
      email: "jukkapan3@.com",
      username: "guest11123",
      password: "password1112",
    });

    const feedbackGet = await getUserById(prisma, connectionCheck.id);
    return {
      message: "Database connection successful.",
      data: connectionCheck,
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
