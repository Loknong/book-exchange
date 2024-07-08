import { PrismaClient } from "@prisma/client";
import { CreateOffer, UpdateOffer } from "./offer.types";
import {
  validateStateError,
  validateStateTransition,
} from "@src/utils/validateStateChange";
import { shouldGoNext } from "@src/utils/stateTransition";

// Create Offer
export const createOffer = async (prisma: PrismaClient, data: CreateOffer) => {
  return prisma.$transaction(async (prismaTransaction) => {
    // check for can repeat offer to this book
    const isOfferExist = await prismaTransaction.offers.findMany({
      where: {
        AND: [{ bookId: data.bookId }, { offeredById: data.offeredById }],
      },
    });

    console.log("isOfferExist", isOfferExist);

    // if (isOfferExist) throw new Error("You already have offers to this book.");
    // create offer
    const offer = await prismaTransaction.offers.create({
      data,
    });
    console.log("Offer:", offer);

    // Make Notification
    // Implement later

    return {
      message: "Offer craeted successfully",
      data: { offerId: offer.id, offer },
    };
  });
};

// Update Offer
export const updateOffer = async (
  prisma: PrismaClient,
  offerId: number,
  data: UpdateOffer
) => {
  return prisma.$transaction(async (prismaTransaction) => {
    // Check this offer is exist or not
    const isOfferExist = await prismaTransaction.offers.findUnique({
      where: { id: offerId },
    });

    if (!isOfferExist) throw new Error("Offer is not exist");
    console.log("isOfferExist", isOfferExist);

    // Validate state before change
    const isAllowed = validateStateTransition(
      "OfferStatus",
      isOfferExist.status,
      data.status
    );
    if (!isAllowed)
      throw new Error(
        validateStateError("Offers", "OfferStatus", isOfferExist.status)
      );

    // Update Offer
    const offer = await prismaTransaction.offers.update({
      where: { id: isOfferExist.id },
      data: { status: data.status },
    });
    console.log("Offer:", offer);

    const transactionCreate = shouldGoNext("Offers", offer.status)
      ? await prismaTransaction.transactions.create({
          data: {
            offerId: offer.id,
          },
        })
      : undefined;

    // Make Notification
    // Let User know Trasction was create need his/her confirm transacion
    // Implement later

    const resultOffer = {
      offerId: offer.id,
      status: offer.status,
      updatedAt: offer.updatedAt,
    };
    const resultTransaction = {
      offerId: transactionCreate?.offerId,
      status: transactionCreate?.status,
      createdAt: transactionCreate?.createdAt,
      link: transactionCreate
        ? `/transaction/${transactionCreate?.id}`
        : undefined,
    };
    return {
      message: transactionCreate
        ? "Your ACCEPT Offer, Transaction was create."
        : "Your REJECT Offer, Process closed",
      dataOffer: resultOffer,
      dataTransaction: transactionCreate ? resultTransaction : undefined,
    };
  });
};

// Get Offers
export const getOffer = async (prisma: PrismaClient, userId: number) => {
  return prisma.$transaction(async (prismaTransaction) => {
    console.log("UserId", userId);

    // get offer
    const offer = await prismaTransaction.offers.findMany({
      where: { OR: [{ offeredById: userId }, { offeredToId: userId }] },
    });
    console.log("Offer:", offer);

    // Make Notification
    // Implement later

    return {
      message: "Offers retrieved successfully",
      data: offer,
    };
  });
};

// export const template = async () => {
//   const genres = await prisma.genres.findMany();
//   console.log("Genres:", genres);

//   return genres;
// };
