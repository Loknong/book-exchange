import {
  PrismaClient,
  Prisma,
  UserTranStatus,
  OfferStatus,
  TransactionStatus,
  AdminStatus,
  PaymentStatus,
} from "@prisma/client";
import { updateOffer } from "./offers/offer.services";
import * as UserStatus from "./user-status/userTransactionStatus.services";
import * as AdminServices from "./admin/admin.services";
import * as HandleUserTransaction from "./utils/handler/userTransactionHandlers";
import {
  handleOfferAccepted,
  handleOfferRejected,
} from "./utils/handler/offerHandlers";
import { v4 as uuidv4 } from "uuid";
import {
  receivedBook,
  sendAddress,
} from "./utils/handler/adminManagementHandlers";
import { receivedBookProcess } from "./utils/transactionKey";
import { ResponseHandler } from "@src/api/utils/ApiResponse";
import prisma from "@src/services/prismaService";

interface UpdateOfferData {
  status: OfferStatus;
}

export const updateOfferChain = async (
  prisma: PrismaClient,
  offerId: number,
  data: UpdateOfferData
) => {
  return prisma.$transaction(
    async (prismaTransaction: Prisma.TransactionClient) => {
      const offer = await updateOffer(prismaTransaction, offerId, data);
      let transactionCreate = null;
      let userTransaction = null;

      switch (data.status) {
        case "PENDING":
          break;
        case "ACCEPTED":
          const acceptedResult = await handleOfferAccepted(
            prismaTransaction,
            offerId,
            offer.offeredById,
            offer.offeredToId
          );
          transactionCreate = acceptedResult.transactionCreate;
          userTransaction = acceptedResult.userTransaction;
          break;
        case "REJECTED":
          await handleOfferRejected(offer.offeredById);
          break;
        default:
          throw new Error("Invalid status");
      }

      return new ResponseHandler(
        "success",
        transactionCreate
          ? "Offer accepted, transaction created."
          : "Offer updated.",
        {
          offerId: offer.id,
          status: offer.status,
          updatedAt: offer.updatedAt,
          transaction: transactionCreate
            ? {
                offerId: transactionCreate.offerId,
                status: transactionCreate.status,
                createdAt: transactionCreate.createdAt,
                link: `/transaction/${transactionCreate.id}`,
              }
            : undefined,
          userTransaction: userTransaction || undefined,
        }
      );
    }
  );
};

export const updateUserTransactionChain = async (
  prisma: PrismaClient,
  transactionId: number,
  userId: number,
  status: UserTranStatus,
  imageUrl?: string
) => {
  return prisma.$transaction(
    async (prismaTransaction: Prisma.TransactionClient) => {
      const userTransaction = await UserStatus.updateUserTransaction(
        prismaTransaction,
        transactionId,
        userId,
        status
      );

      let result = null;

      switch (status) {
        case "PENDING":
          break;
        case "CANCELED":
          result = await HandleUserTransaction.handleCanceledCase(
            prismaTransaction,
            transactionId,
            TransactionStatus.CANCELED
          );
          break;
        case "CONFIRMED":
          result = await HandleUserTransaction.ConfirmedCase(
            prismaTransaction,
            transactionId,
            userId,
            TransactionStatus.CONFIRMED
          );
          break;
        case "WAITING_CHECK_EVIDENCE":
          if (imageUrl)
            result = await HandleUserTransaction.UserUpdatePayment(
              prismaTransaction,
              transactionId,
              userId,
              imageUrl
            );
          break;
        case "PAYMENT_SUCCESS":
          result = await HandleUserTransaction.PaymentSuccessCase(
            prismaTransaction,
            transactionId,
            userId
          );
          break;
        case "PAYMENT_FAILED":
          result = await HandleUserTransaction.PaymentFailCase(
            prismaTransaction,
            transactionId,
            userId
          );
          break;
        case "RECEIVED_ADDRESS":
          result = await HandleUserTransaction.ReceivedAddress(
            prismaTransaction,
            transactionId
          );
          break;
        case "SENDING_BOOK":
          result = await HandleUserTransaction.SendingBook(
            prismaTransaction,
            transactionId,
            userId
          );
          break;
        default:
          throw new Error("Invalid status");
      }

      return new ResponseHandler(
        "success",
        "User transaction updated successfully.",
        {
          userTransaction,
          ...result,
        }
      );
    }
  );
};

export const adminAction = async (
  prisma: PrismaClient,
  transactionId: number,
  status: AdminStatus
) => {
  return prisma.$transaction(
    async (prismaTransaction: Prisma.TransactionClient) => {
      let result = null;

      switch (status) {
        case "SENDING_ADDRESS":
          result = await sendAddress(prismaTransaction, transactionId);
          break;
        case "CHECKING_PAYMENT_EVIDENCE":
        case "CHECKED_PAYMENT_COMPLETED":
        case "WAITING_BOOK":
        case "RECEIVED_BOOK":
          // Process logic here
          break;
        case "SENDING_BOOK_TO_USER":
        case "COMPLETED":
          // Process logic here
          break;
        default:
          throw new Error(`Unhandled status: ${status}`);
      }

      return result;
    }
  );
};

// export const bookReceivingProcess = async (
//   prisma: PrismaClient,
//   transactionId: string,
//   userId: string,
//   code?: string
// ) => {
//   // Implement book receiving process here
//   return prisma.$transaction(
//     async (prismaTransaction: Prisma.TransactionClient) => {
//       const transaction = await prismaTransaction.transactions.findUnique({
//         where: {
//           id: parseInt(transactionId),
//         },
//         include: {

//         },
//       });

//       if (!transaction) {
//         throw new Error("Transaction not found");
//       }

//       const userTransaction = transaction.userTransactions[0];

//       if (!userTransaction) {
//         throw new Error("User transaction not found");
//       }

//       return new ResponseHandler(
//         "success",
//         "Book received successfully",
//         result
//       );
//     }
//   );
//   )
// };
