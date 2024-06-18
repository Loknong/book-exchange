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
