import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as services from "./offer.services";
import { CreateOffer, UpdateOffer } from "./offer.types";

// Create Offer
export const handleCreateOffer = async (
  req: Request<{}, {}, CreateOffer>,
  res: Response
) => {
  const data: CreateOffer = {
    bookId: Number(req.body.bookId),
    offeredById: Number(req.body.offeredById),
    offeredToId: Number(req.body.offeredToId),
    details: req.body.details ? req.body.details : null,
    status: req.body.status,
  };
  try {
    const result = await services.createOffer(prisma, data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

// Update Offer

export const handleUpdateOffer = async (
  req: Request<{ offerId: number }, {}, UpdateOffer>,
  res: Response
) => {
  const offerId = Number(req.params.offerId);

  try {
    const result = await services.updateOffer(prisma, offerId, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

// Get Offers
export const handleGetOffers = async (
  req: Request<{ userId: number }>,
  res: Response
) => {
  const userId = Number(req.params.userId);
  try {
    const result = await services.getOffer(prisma, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};
