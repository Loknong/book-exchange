import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as authService from "./auth.services";
import {
  CreateUserRequest,
  UserLoginRequest,
  UserLogoutRequest,
} from "./auth.types";
import { ResponseHandler } from "@src/api/utils/ApiResponse";

export const handleRegisterTransaction = async (
  req: Request<{}, {}, CreateUserRequest>,
  res: Response
) => {
  console.log("Enter Transaciton Create user");
  console.log("Request :", req.body);
  console.log("Request :", req.file);

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
    const user = await authService.loginUser(prisma, req.body);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const { token, ...userData } = user;
    const responseData = { user: userData, token };
    const response = new ResponseHandler(
      "success",
      "User logged in successfully",
      responseData
    );
    res.status(200).json(response);
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
