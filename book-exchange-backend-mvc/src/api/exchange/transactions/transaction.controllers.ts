import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as services from "./transaction.services";

export const template = async (req: Request, res: Response) => {
  try {
    res.status(200).json();
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

export const handleGetTransacion = async (
  req: Request<{ transactionId: number }>,
  res: Response
) => {
  const transactionId = Number(req.params.transactionId);
  try {
    const transaction = await services.getTransacitonById(
      prisma,
      transactionId
    );
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};
