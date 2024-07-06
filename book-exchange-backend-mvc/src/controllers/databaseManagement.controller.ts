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

export const handleMockData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await databaseService.mockDatabase(prisma);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred.",
    });
  }
};

export const handleSetup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await databaseService.resetAndMockDatabase(prisma);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred.",
    });
  }
};

export const handleTablesDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.query);
  
  const tableName = String(req.query.tableName);
  try {
    const result = await databaseService.getTablesAndDescriptions(
      prisma,
      tableName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred.",
    });
  }
};
