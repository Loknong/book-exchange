import { Request, Response } from "express";
import { pool } from "../../services/db";
import { CreateUserRequest, LoginUser } from "../../interfaces/legacy/authModel";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { authLogin } from "../../services/legacy/authService";
import { error } from "console";

// ChatGPT Improve
export const handleLogin = async (req: Request, res: Response) => {
  console.log("enter handleLogin");
  console.log(req.body);
  try {
    const result = await authLogin(req.body);

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
