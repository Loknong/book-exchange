import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as authService from "./auth.services";
import {
  CreateUserRequest,
  UserLoginRequest,
  UserLogoutRequest,
} from "./auth.types";

export const handleRegisterTransaction = async (
  req: Request<{}, {}, CreateUserRequest>,
  res: Response
) => {
  console.log("Enter Transaciton Create user");
  console.log("Request :", req.body);
  console.log("Request :", req.file);
  //   const { firstName, lastName, email, username, password } = req.body;
  const pictureName = req.file?.filename;
  console.log(pictureName);

  try {
    const user = pictureName
      ? await authService.registerUserWithProfile(prisma, req.body, pictureName)
      : await authService.registerUser(prisma, req.body);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

export const handleLoginUser = async (
  req: Request<{}, {}, UserLoginRequest>,
  res: Response
) => {
  try {
    const result = await authService.loginUser(prisma, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

export const handleLogoutUser = async (
  req: Request<{}, {}, UserLogoutRequest>,
  res: Response
) => {
  try {
    const userId = req.body.userId;
    const result = await authService.logoutUser(prisma, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};
