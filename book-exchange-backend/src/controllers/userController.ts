import { Request, Response } from "express";
import { createUser, getUserById } from "@src/services/userService";

export const handleCreateUser = async (req: Request, res: Response) => {
  console.log("enter");
  console.log(req.body);
  try {
    const user = await createUser(req.body);

    if (user) {
      res.status(201).json(user);
    } else {
      res.status(500).json({ error: "Failed to create user" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "unexpected error occurred" });
    }
  } 
};

export const handleGetUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const user = await getUserById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};
