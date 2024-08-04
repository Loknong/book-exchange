import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as services from "./exchange.services";
import { shouldGoNext } from "@src/utils/stateTransition";
import { UserTranStatus } from "@prisma/client";
import { ResponseHandler } from "../utils/ApiResponse";

import fs from "fs";
import path from "path";

export const handleUpdateOffer = async (req: Request, res: Response) => {
  const { offerId } = req.params;
  const data = req.body;

  try {
    const result = await services.updateOfferChain(
      prisma,
      parseInt(offerId),
      data
    );
    res
      .status(200)
      .json(new ResponseHandler("success", "Offer updated", result));
  } catch (error) {
    res
      .status(500)
      .json(new ResponseHandler("error", "Unexpected error occured", error));
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

  try {
    const result = await services.updateUserTransactionChain(
      prisma,
      transactionId,
      userId,
      status
    );
    res
      .status(200)
      .json(new ResponseHandler("success", "User transaction updated", result));
  } catch (error) {
    res
      .status(500)
      .json(new ResponseHandler("error", "Unexpected error occured", error));
  }
};
