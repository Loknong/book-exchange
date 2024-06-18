import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";

import * as userService from "../services/userAction.services";
import { CreateUserRequest } from "@src/types";

export const registerUser = async (
  req: Request<{}, {}, CreateUserRequest>,
  res: Response
) => {
  console.log("Enter Register User");

  console.log("Request :", req);

  try {
    const user = await userService.registerUser(prisma, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

export const handleRegisterTransaciton = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req);

  const pictureName = req.file?.filename;
  const { firstName, lastName, email, username, password } = req.body;

  try {
    if (pictureName) {
      const result = await userService.registerUserWithProfile(
        prisma,
        { firstName, lastName, email, username, password },
        pictureName
      );
      res.status(200).json(result);
    } else {
      res.status(200).json({ message: "No picture" });
    }
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleGetUserInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUserInfo(prisma, Number(userId));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};
