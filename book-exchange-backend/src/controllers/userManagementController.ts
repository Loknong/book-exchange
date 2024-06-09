import { UserEdit } from "@src/interfaces/User";
import {
  addUserBook,
  getUserInventory,
  getUserProfile,
  updateUserProfile,
} from "@src/services/userManagementServices";
import { Request, Response } from "express";

export const handleGetProfile = async (req: Request, res: Response) => {
  console.log(req.params);
  try {
    const result = await getUserProfile(req.params.userId);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(401)
      .json({
        error:
          error instanceof Error ? error.message : "Unexpected error occurred",
      });
  }
};

export const handleUpdateProfile = async (
  req: Request<{}, {}, UserEdit>,
  res: Response
) => {
  console.log(req.body);

  try {
    const result = await updateUserProfile(req.body);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(401)
      .json({
        error: error instanceof Error ? error.message : "Unexpected occurred",
      });
  }
};

export const handleAddBook = async (req: Request, res: Response) => {
  const { title, author, genreId, bookCondition, description, ownerId } =
    req.body;
  const thumbnail = req.file?.filename;

  if (!thumbnail)
    res.status(400).json({ error: "Thumbnail image is required" });

  try {
    const book = await addUserBook({
      title,
      author,
      genreId,
      bookCondition,
      description,
      ownerId,
      thumbnail,
    });

    if (!book) res.status(500).json({ error: "Failed to add the book" });
    res.status(201).json(book);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred"
    );
  }
};



export const handleGetInventory = async (req:Request, res:Response) => {
    console.log(req.params.ownerId);
    try {
        const ownerId = req.params.ownerId;
        const result = await getUserInventory(ownerId)
        res.status(200).json(result);

    } catch (error) {
        res.status(401).json({error: error instanceof Error ? error.message : "Unexpected error occurred"})
    }
    
};

export const handleUpdateBookStatus = async () => {};

export const handleUploadProfileImage = async () => {};

export const handleDeleteAccount = async () => {};
