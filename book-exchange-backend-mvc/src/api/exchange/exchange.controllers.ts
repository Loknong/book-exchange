import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as services from "./exchange.services";
import { shouldGoNext } from "@src/utils/stateTransition";
import { UserTranStatus } from "@prisma/client";

import fs from "fs";
import path from "path";

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

export const handleUpdateUserStatus = async (
  req: Request<
    { transactionId: number; userId: number },
    {},
    { status: UserTranStatus }
  >,
  res: Response
) => {
  const transactionId = Number(req.params.transactionId);
  const userId = Number(req.params.userId);
  const status = req.body.status;
  console.log("Im in");
  console.log("SSS", status);

  try {
    const result = await services.updateUserTransacionChain(
      prisma,
      transactionId,
      userId,
      status
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};
