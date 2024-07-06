import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as services from "./userBook.services";
import { CreateBookRequest } from "../book.types";

export const template = async (req: Request, res: Response) => {
  try {
    res.status(200).json();
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

// get user book list

export const handleGetUserBooks = async (
  req: Request<{ ownerId: number }>,
  res: Response
) => {
  const ownerId = Number(req.params.ownerId);
  try {
    const books = await services.getUserBook(prisma, ownerId);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
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
      return res.status(400).json({ error: "Book cover is required." });
    }

    const book = await services.createUserBook(prisma, data, bookCover);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
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
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

// Update User Book Detail
export const handleUpdateBookDetail = async (req: Request, res: Response) => {
  const bookId = Number(req.params.bookId);
  try {
    const book = await services.updateUserBookDetail(prisma, bookId, req.body);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
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
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};
