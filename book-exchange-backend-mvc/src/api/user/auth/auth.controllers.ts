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

    res
      .status(200)
      .json(
        new ResponseHandler("success", "User registered successfully", user)
      );
  } catch (error) {
    res
      .status(500)
      .json(new ResponseHandler("error", "Unexpected error occured", error));
  }
};

export const handleLoginUser = async (
  req: Request<{}, {}, UserLoginRequest>,
  res: Response
) => {
  try {
    const user = await authService.loginUser(prisma, req.body);
    // Check if there's an error returned from the loginUser function
    if (user?.error) {
      return res.status(401).json({ message: user.error });
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
    res
      .status(500)
      .json(new ResponseHandler("error", "Unexpected error occured", error));
  }
};

export const handleLogoutUser = async (
  req: Request<{}, {}, UserLogoutRequest>,
  res: Response
) => {
  try {
    const userId = req.body.userId;
    const result = await authService.logoutUser(prisma, userId);
    res
      .status(200)
      .json(new ResponseHandler("success", "User logged out", result));
  } catch (error) {
    res
      .status(500)
      .json(new ResponseHandler("error", "Unexpected error occured", error));
  }
};

export const handleKickAllUser = async (req: Request, res: Response) => { 
 
  try {
    console.log("Kick all users");
    
    const result = await authService.kickAllUser(prisma);
    console.log("Result", result);
    
    res
      .status(200)
      .json(new ResponseHandler("success", "All users logged out", result));
  } catch (error) {
    res
      .status(500)
      .json(new ResponseHandler("error", "Unexpected error occured", error));
  } 
}