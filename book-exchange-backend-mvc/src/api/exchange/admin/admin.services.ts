import { PrismaClient, Prisma, AdminStatus } from "@prisma/client";
import {
  validateStateError,
  validateStateTransition,
} from "../utils/validateStateChange";

// Update User Transaction Status
export const updateAdminManagement = async (
  prisma: Prisma.TransactionClient,
  transactionId: number,
  status: AdminStatus,
  detail?: string
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

  // check admin transaction is exist
  const isExist = await prisma.adminManagement.findMany({
    where: {
      transactionId,
    },
  });
  console.log("isExist", isExist);

  if (!isExist) throw new Error("User Status row does not exist!!");

  // allowed to update ?
  const isAllowed = validateStateTransition(
    "AdminManagement",
    isExist[0].status,
    status
  );

  console.log("isAllowed", isAllowed);

  if (!isAllowed)
    throw new Error(
      validateStateError(
        "AdminManagement",
        "AdminManagement",
        isExist[0].status
      )
    );

  return prisma.adminManagement.updateMany({
    where: {
      transactionId,
    },
    data: {
      status,
      details: detail ? detail : undefined,
    },
  });
};
