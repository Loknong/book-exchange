import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import { UserProfileRequest } from "./profile.types";
import * as services from "./profile.services";

export const handleRegisterTransaction = async (
  req: Request<UserProfileRequest>,
  res: Response
) => {
  console.log("params", req.params);
const userId = Number(req.params.userId)
  try {
    const userProfile = await services.getUserProfile(prisma, userId);

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};
