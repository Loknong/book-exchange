import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as services from "./exchange.services";
import { shouldGoNext } from "@src/utils/stateTransition";

export const handleUpdateOffer = async (req: Request, res: Response) => {
  const { offerId } = req.params;
  const data = req.body;
  console.log("Im in");

  try {
    const result = await services.updateOfferChain(
      prisma,
      parseInt(offerId),
      data
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};
