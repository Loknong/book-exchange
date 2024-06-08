import { Request, Response } from "express";
import { pool } from "../services/db";
import { CreateUserRequest, LoginUser } from "../interfaces/legacy/authModel";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { authLogin } from "@src/services/authService";
import { error } from "console";

// export const signup = async (req: Request, res: Response) => {
//   const { username, password, email }: CreateUserRequest = req.body;

//   console.log(`Request body: ${JSON.stringify(req.body)}`);
//   console.log(`${username}, ${password}, ${email}`);

//   try {
//     const [result] = await pool.query<ResultSetHeader>(
//       "INSERT INTO users(username, user_pwd, email) VALUES(?, ?, ?)",
//       [username, password, email]
//     );

//     res
//       .status(201)
//       .json({ message: "User created successfully", userId: result.insertId });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: `Error creating user: ${(error as Error).message}` });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   const { username, password }: LoginUser = req.body;
//   console.log(username, password);

//   try {
//     const [rows] = await pool.query<RowDataPacket[]>(
//       `SELECT * FROM users WHERE username = ? AND user_pwd = ?`,
//       [username, password]
//     );

//     if (rows.length === 0) {
//       return res.status(401).json({ message: "Invalud credentials" });
//     }
//     res.status(200).json({ message: "Login successfully", user: rows[0] });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: `Internale server Error ${(error as Error).message}` });
//   }
// };

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
