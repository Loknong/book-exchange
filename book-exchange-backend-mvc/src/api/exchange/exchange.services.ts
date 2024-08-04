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

interface data {
  status: OfferStatus;
}
export const updateOfferChain = async (
  prisma: PrismaClient,
  offerId: number,
  data: data
) => {
  return prisma.$transaction(
    async (prismaTransaction: Prisma.TransactionClient) => {
      // Update the offer
      const offer = await updateOffer(prismaTransaction, offerId, data);

      // Chain Process
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
        case "REJECTED":
          await handleOfferRejected(offer.offeredById);
        default:
          break;
      }

      // Build Response
      const resultOffer = {
        offerId: offer.id,
        status: offer.status,
        updatedAt: offer.updatedAt,
      };
      const resultTransaction = transactionCreate
        ? {
            offerId: transactionCreate.offerId,
            status: transactionCreate.status,
            createdAt: transactionCreate.createdAt,
            link: `/transaction/${transactionCreate.id}`,
          }
        : undefined;
      const resultUserTransaciton = userTransaction
        ? userTransaction
        : undefined;
      return {
        message: transactionCreate
          ? "Offer accepted, transaction created."
          : "Offer updated.",
        dataOffer: resultOffer,
        dataTransaction: resultTransaction,
        dataUserTransaction: resultUserTransaciton,
      };
    }
  );
};

export const updateUserTransacionChain = async (
  prisma: PrismaClient,
  transactionId: number,
  userId: number,
  status: UserTranStatus,
  imageUrl?: string
) => {
  return prisma.$transaction(
    async (prismaTransaction: Prisma.TransactionClient) => {
      // Main Process
      const userTransaction = await UserStatus.updateUserTransaction(
        prismaTransaction,
        transactionId,
        userId,
        status
      );

      let result = null;
      // Chain Process User Transaction Status
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
          // console.log("result", result);

          break;
        // case "USER_PAYMENT_PENDING":
        case "WAITING_CHECK_EVIDENCE":
          if (imageUrl)
            result = await HandleUserTransaction.UserUpdatePayment(
              prismaTransaction,
              transactionId,
              userId,
              imageUrl
            );
          break;
        // for PAYMENT_SUCCESS and PAYMENT_FAILED admin call these function
        case "PAYMENT_SUCCESS":
          result = await HandleUserTransaction.PaymentSuccessCase(
            prismaTransaction,
            transactionId,
            userId
            // PaymentStatus.COMPLETED
          );
          console.log("Payment Success", transactionId, userId);
          break;

        case "PAYMENT_FAILED":
          result = await HandleUserTransaction.PaymentFailCase(
            prismaTransaction,
            transactionId,
            userId
            // PaymentStatus.COMPLETED
          );
          console.log("Payment Failed", transactionId, userId);
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
        case "SEND_BOOK_COMPLETED":
        case "WAITING_RECEIVED_BOOK":
        case "RECEIVED_BOOK":

        default:
          break;
      }

      // Build Result

      return { userTransaction, ...result };
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

        // Add other cases here as needed
        case "CHECKING_PAYMENT_EVIDENCE":
        case "CHECKED_PAYMENT_COMPLETED":
        case "WAITING_BOOK":
        case "RECEIVED_BOOK":
          // Checking book process, get userId, also Get this userId is owner or offer, bookId ,transactionId from this book.

          break;
        // result = await
        case "SENDING_BOOK_TO_USER":
        case "COMPLETED":
        default:
          throw new Error(`Unhandled status: ${status}`);
      }

      return result;
    }
  );
};

/**
 * 
 * @param code it code that user scan or put from frontned // code is gen from our system.
 * @param transactionId use for find unique key to cross check with code
 * @param userId for who is action we will use this id to check is action from Admin, book owner or book offerer. so we can proceed in this donctiion
 */
export const bookReceivingProcess = async (
  code: string,
  transactionId: string,
  userId: string
) => {

  

};
