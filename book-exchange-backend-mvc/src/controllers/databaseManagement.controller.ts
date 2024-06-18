import { Request, Response } from "express";
import prisma from "@src/services/prismaService";
import * as databaseService from "../services/databaseManagement";

export const handleResetDatabase = async (req: Request, res: Response) => {
  console.log("Start reset database");

  try {
    const result = await databaseService.resetDatabase(prisma);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};
