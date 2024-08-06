import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as services from "./userBook.services";
import { CreateBookRequest } from "../book.types";
import { ResponseHandler } from "@src/api/utils/ApiResponse";

// get user book list

export const handleGetUserBooks = async (
  req: Request<{ ownerId: number }>,
  res: Response
) => {
  const ownerId = Number(req.params.ownerId);
  const userId = req.body.user.id; // from auth middleware
  if (ownerId !== userId) {
    const response = new ResponseHandler(
      "error",
      "Unauthorized",
      undefined,
      "You are not authorized to view this resource."
    );
    return res.status(401).json(response);
  }
  try {
    const books = await services.getUserBook(prisma, ownerId);
    const response = new ResponseHandler(
      "success",
      "Books fetched successfully",
      books
    );

    res.status(200).json(response);
  } catch (error) {
    const response = new ResponseHandler(
      "error",
      "An error occured while fetching books",
      undefined,
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
    res.status(500).json(response);
  }
};

// create User Book

export const handleCreateUserBook = async (
  req: Request<{}, {}, CreateBookRequest>,
  res: Response
) => {
  const data = {
    ...req.body,
    genreId: Number(req.body.genreId),
    ownerId: Number(req.body.ownerId),
  };
  try {
    const bookCover = req.file?.filename;
    if (!bookCover) {
      const response = new ResponseHandler(
        "error",
        "Book cover is required",
        undefined,
        "Book cover is required."
      );
      return res.status(400).json(response);
    }

    const book = await services.createUserBook(prisma, data, bookCover);
    const response = new ResponseHandler(
      "success",
      "Book created successfully",
      book
    );
    res.status(200).json(response);
  } catch (error) {
    const response = new ResponseHandler(
      "error",
      "An error occured while creating book",
      undefined,
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
    res.status(500).json(response);
  }
};

// Delete User Book
export const handleDeleteUserBook = async (
  req: Request<{ bookId: number }>,
  res: Response
) => {
  const bookId = Number(req.params.bookId);
  try {
    const book = await services.deleteUserBook(prisma, bookId);
    const response = new ResponseHandler(
      "success",
      "Book deleted successfully",
      book
    );
    res.status(200).json(response);
  } catch (error) {
    const response = new ResponseHandler(
      "error",
      "An error occured while deleting book",
      undefined,
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
    res.status(500).json(response);
  }
};

// Update User Book Detail
export const handleUpdateBookDetail = async (req: Request, res: Response) => {
  const bookId = Number(req.params.bookId);
  try {
    const book = await services.updateUserBookDetail(prisma, bookId, req.body);
    const response = new ResponseHandler(
      "success",
      "Book updated successfully",
      book
    );
    res.status(200).json(response);
  } catch (error) {
    const response = new ResponseHandler(
      "error",
      "An error occured while updating book",
      undefined,
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
    res.status(500).json(response);
  }
};

// Update User Book Image

export const handleUpdateBookImage = async (
  req: Request<{}, {}, { bookId: number }>,
  res: Response
) => {
  const bookId = Number(req.body.bookId);
  const bookImageName = req.file?.filename;
  try {
    const book = bookImageName
      ? await services.updateUserBookImage(prisma, bookId, bookImageName)
      : { message: "Image not found" };
    const response = new ResponseHandler(
      "success",
      "Book image updated successfully",
      book
    );
    res.status(200).json(response);
  } catch (error) {
    const response = new ResponseHandler(
      "error",
      "An error occured while updating book image",
      undefined,
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
    res.status(500).json(response);
  }
};
