import { Request, Response } from "express";
import {
  registerUser,
  authenticateUser,
  logoutUser,
  resetPassword,
  forgotPassword,
  verifyEmail,
  resendEmailVerification,
} from "../services/userAuthServices";
import { error } from "console";

export const handleRegister = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const result = await registerUser(req.body);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ error: "Failed to login" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "unexpected error occurred" });
    }
  }
};
