import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as authService from "./auth.services";
import { CreateUserRequest } from "./auth.types";

export const handleRegisterTransaction = async (
  req: Request<{}, {}, CreateUserRequest>,
  res: Response
) => {
  console.log("Enter Transaciton Create user");
  console.log("Request :", req.body);
  console.log("Request :", req.file);
  //   const { firstName, lastName, email, username, password } = req.body;
  try {
      const pictureName = req.file?.filename;
    if (pictureName) {
      const user =await authService.registerUserWithProfile(
        prisma,
        req.body,
        pictureName
      );
      console.log("User Res:", user);
      
      res.status(200).json(user)
    } else {
      const user =await authService.registerUser(prisma, req.body);
      console.log("User Res:", user);
      res.status(200).json(user)
    }
    
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};
