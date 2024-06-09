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
  console.log(req.body);
  try {
    const result = await registerUser(req.body);
    if (result) {
      res.status(200).json(result);
    } else {
      res
        .status(500)
        .json({ error: `Failed to register for user: ${req.body.username}` });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "unexpected error occurred" });
    }
  }
};

export const handleAuthenticate = async (
  req: Request<{}, {}, UserLogin>,
  res: Response
) => {
  console.log(req.body);

  try {
    const result = await authenticateUser(req.body);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "unexpected error occurred" });
    }
  }
};

export const handleLogout = async (req:Request<{},{},{userId:number}>, res:Response) => {
  
}
// export const handleAuthenticate = (req:Request, res:Response) => {

//     try {
//         if (condition) {

//         } else {

//         }
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(500).json({error: error.message})
//         } else {
//             res.status(500).json({error:"unexpected error occurred"})
//         }
//     }
// }
