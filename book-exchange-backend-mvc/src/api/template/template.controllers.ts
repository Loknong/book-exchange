import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as services from "./template.services";

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
