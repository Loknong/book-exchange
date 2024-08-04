import {
  Prisma,
  TransactionStatus,
  AdminStatus,
  UserTranStatus,
  PaymentStatus,
} from "@prisma/client";
import { sendNotification } from "@src/api/notifications/notification.services";
import { logAction } from "@src/api/log/log.services";
import * as AdminServices from "../../admin/admin.services";
import * as Transaction from "../../transactions/transaction.services";
import { generateUniqueCode } from "../generateUniqueCode";
import { receivedBookProcess } from "../transactionKey";

export const sendAddress = async (
  prismaTransaction: Prisma.TransactionClient,
  transactionId: number
) => {
  // Fetch the IDs of users involved in the transaction
  const getUserIds = await prismaTransaction.transactions.findUnique({
    where: { id: transactionId },
    select: {
      offer: {
        select: {
          offeredById: true,
          offeredToId: true,
        },
      },
    },
  });

  if (!getUserIds || !getUserIds.offer) {
    throw new Error("Transaction not found or associated offer not found");
  }

  const { offeredById, offeredToId } = getUserIds.offer;

  // Assuming addresses are passed or fetched from another source
  const offeredByAddress = "Address of offeredBy";
  const offeredToAddress = "Address of offeredTo";

  // Generate unique codes for each user
  const offeredByCode = generateUniqueCode();
  const offeredToCode = generateUniqueCode();

  // Store the addresses and codes in the TransactionDetails table
  await prismaTransaction.transactionDetails.create({
    data: {
      transactionId: transactionId,
      offeredByAddress: offeredByAddress,
      offeredToAddress: offeredToAddress,
      offeredByCode: offeredByCode,
      offeredToCode: offeredToCode,
    },
  });

  // Send the addresses and codes via notification
  await sendNotification(
    offeredById,
    `Send your book to: ${offeredToAddress}. Your confirmation code is: ${offeredByCode}`
  );
  await sendNotification(
    offeredToId,
    `Send your book to: ${offeredByAddress}. Your confirmation code is: ${offeredToCode}`
  );

  // Log the action
  await logAction(
    `Addresses and codes sent to users for transaction ${transactionId}`,
    transactionId
  );

  // Update AdminManagement status to SENDING_ADDRESS
  await prismaTransaction.adminManagement.updateMany({
    where: {
      transactionId: transactionId,
    },
    data: {
      status: "SENDING_ADDRESS",
    },
  });

  // Update Transaction status to ADDRESS_SENT
  await prismaTransaction.transactions.update({
    where: { id: transactionId },
    data: { status: "ADDRESS_SENT" },
  });

  return { message: "Addresses sent successfully" };
};

export const receivedBook = async (
  prismaTransaction: Prisma.TransactionClient,
  transactionId: number,
  
) => {
  const code = "Just a random string";
  const transactionUniqueKey = "UniqueKey";
  const userId = 1;
  const checkingBook = await receivedBookProcess(
    code,
    transactionUniqueKey,
    userId,
    prismaTransaction
  );
};
