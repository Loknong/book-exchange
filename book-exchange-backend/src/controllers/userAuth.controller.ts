import { Request, Response } from "express";
import {
  registerUser,
  authenticateUser,
  logoutUser,
  resetPassword,
  forgotPassword,
  verifyEmail,
  resendEmailVerification,
  getUserList,
} from "../services/userAuth.services";
import { UserLogin, UserSignup } from "@src/interfaces/User";

/**
 * <{}, {}, Type/Interface> in Request type:
 * - First {}: Type for route parameters (e.g., /user/:id)
 * - Second {}: Type for query parameters (e.g., /user?id=123)
 * - Third Type/Interface: Type for request body (e.g., POST /user with JSON body)
 */
export const handleRegister = async (
  req: Request<{}, {}, UserSignup>,
  res: Response
) => {
  const pictureName = req.file?.filename; // Extract the filename from the uploaded file
  console.log(req.body);
  console.log(req.file);
  try {
    const result = await registerUser(req.body, pictureName);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleAuthenticate = async (
  req: Request<{}, {}, UserLogin>,
  res: Response
) => {
  console.log(req.body);

  try {
    const result = await authenticateUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleLogout = async (
  req: Request<{}, {}, { userId: number }>,
  res: Response
) => {
  console.log(req.body);

  try {
    const result = await logoutUser(req.body.userId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "unexpected error occurred" });
    }
  }
};

export const handleResetPassword = async (
  req: Request<{}, {}, { userId: number; newPassword: string }>,
  res: Response
) => {
  console.log(req.body);

  try {
    const result = await resetPassword(req.body.userId, req.body.newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleForgotPassword = async (
  req: Request<{}, {}, { username: string; email: string }>,
  res: Response
) => {
  console.log(req.body);

  try {
    const result = await forgotPassword(req.body.username, req.body.email);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleVerifyEmail = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const result = await verifyEmail();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleResendEmail = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const result = await resendEmailVerification();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleGetUserList = async (req: Request, res: Response) => {
  try {
    const result = await getUserList();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occurred",
    });
  }
};
