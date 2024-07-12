import {
  PrismaClient,
  Prisma,
  UserTranStatus,
  OfferStatus,
  TransactionStatus,
} from "@prisma/client";
import { updateOffer } from "./offers/offer.services";
import * as UserStatus from "./user-status/userTransactionStatus.services";
import * as HandleUserTransaction from "./utils/handler/userTransactionHandlers";
import {
  handleOfferAccepted,
  handleOfferRejected,
} from "./utils/handler/offerHandlers";
import { v4 as uuidv4 } from "uuid";

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
  status: UserTranStatus
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
        case "USER_PAYMENT_PENDING":
        case "WAITING_CHECK_EVIDENCE":
        case "PAYMENT_SUCCESS":
        case "PAYMENT_FAILED":
        case "RECEIVED_ADDRESS":
        case "SENDING_BOOK":
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

export const processUserPayment = async () => {
  // Check Upload Evidnce is Success
  // Update UserTransactionStatus to "WAITING_CHECK_EVIDENCE"
  // Insert AdminManagement status =  CHECKING_PAYMENT_EVIDENCE, also with user, transaciton detail
  // Noti Admin to check
  // Logging
};

