import { PrismaClient, Prisma, UserTranStatus } from "@prisma/client";
import { updateOffer } from "./offers/offer.services";
import { createTransaction } from "./transactions/transaction.services";
import * as UserStatus from "./user-status/userTransactionStatus.services";
import { shouldGoNext } from "@src/utils/stateTransition";

export const updateOfferChain = async (
  prisma: PrismaClient,
  offerId: number,
  data: any
) => {
  return prisma.$transaction(
    async (prismaTransaction: Prisma.TransactionClient) => {
      // Update the offer
      const offer = await updateOffer(prismaTransaction, offerId, data);

      // Check if we should proceed to the next step
      let transactionCreate = null;
      if (shouldGoNext("Offers", offer.status)) {
        // Create a new transaction if the offer is accepted
        transactionCreate = await createTransaction(
          prismaTransaction,
          offer.id
        );
      }

      let userTransaction = null;
      if (transactionCreate) {
        userTransaction = await UserStatus.createUserTransaction(
          prismaTransaction,
          [
            { userId: offer.offeredById, transactionId: transactionCreate.id },
            { userId: offer.offeredToId, transactionId: transactionCreate.id },
          ]
        );
      }

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

// export const updateUserTransacionChain = async (
//   prisma: PrismaClient,
//   transactionId: number,
//   userId: number,
//   status: UserTranStatus
// ) => {
//   return prisma.$transaction(
//     async (prismaTransaction: Prisma.TransactionClient) => {
//       // Update the offer
//       const offer = await UserStatus.updateUserTransaction(
//         prismaTransaction,
//         transactionId,
//         userId,
//         status
//       );

//       // Check if we should proceed to the next step
//       let transactionCreate = null;
//       if (shouldGoNext("Offers", offer.status)) {
//         // Create a new transaction if the offer is accepted
//         transactionCreate = await createTransaction(
//           prismaTransaction,
//           offer.id
//         );
//       }

//       let userTransaction = null;
//       if (transactionCreate) {
//         userTransaction = await UserStatus.createUserTransaction(
//           prismaTransaction,
//           [
//             { userId: offer.offeredById, transactionId: transactionCreate.id },
//             { userId: offer.offeredToId, transactionId: transactionCreate.id },
//           ]
//         );
//       }

//       const resultOffer = {
//         offerId: offer.id,
//         status: offer.status,
//         updatedAt: offer.updatedAt,
//       };
//       const resultTransaction = transactionCreate
//         ? {
//             offerId: transactionCreate.offerId,
//             status: transactionCreate.status,
//             createdAt: transactionCreate.createdAt,
//             link: `/transaction/${transactionCreate.id}`,
//           }
//         : undefined;
//       const resultUserTransaciton = userTransaction
//         ? userTransaction
//         : undefined;
//       return {
//         message: transactionCreate
//           ? "Offer accepted, transaction created."
//           : "Offer updated.",
//         dataOffer: resultOffer,
//         dataTransaction: resultTransaction,
//         dataUserTransaction: resultUserTransaciton,
//       };
//     }
//   );
// };
