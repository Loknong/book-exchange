import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as services from "./userTransactionStatus.services";

export const handleGetUserTransactionStatus = async (
  req: Request,
  res: Response
) => {
  // console.log("Im in User Trans sattu");

  const where = {
    userTransactionId: req.query.userTransactionId
      ? Number(req.query.userTransactionId)
      : undefined,
    userId: req.query.userId ? Number(req.query.userId) : undefined,
    transactionId: req.query.transactionId
      ? Number(req.query.transactionId)
      : undefined,
  };

  try {
    const transactions = await services.getUserTransaction(prisma, where);
    res.status(200).json({
      message: "Transactions retrieved successfully",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};
