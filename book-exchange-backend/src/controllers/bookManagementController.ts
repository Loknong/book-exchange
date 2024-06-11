import {
  adminAddBook,
  adminAddNewGenre,
  adminDeleteBook,
  adminDeleteGenre,
  adminUpdateBook,
  adminUpdateGenre,
  getBook,
  getBooksList,
  getGenres,
} from "@src/services/bookManagementServices";
import { Request, Response } from "express";

//! NOT IMPLETMENT YET
export const handleGetAllBook = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.params);

  try {
    const result = await getBooksList();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleGetBook = async (
  req: Request<{bookId: number}>,
  res: Response
) => {
  // console.log("params",req.params.bookId);
  const bookId = req.params.bookId;
  try {
    const result = await getBook(bookId);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleAdminAddBook = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.params);

  try {
    const result = await adminAddBook();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleAdminUpdateBook = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.params);

  try {
    const result = await adminUpdateBook();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleAdminDeleteBook = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.params);

  try {
    const result = await adminDeleteBook();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleGetGenresList = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.params);
console.log("genre");

  try {
    const result = await getGenres();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleAddGenre = async (
  req: Request<{}, {}, { genre: string }>,
  res: Response
) => {
  console.log(req.body);
  console.log(req.params);
  const genre = req.body.genre;

  try {
    const result = await adminAddNewGenre(genre);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleUpdateGenre = async (
  req: Request<{}, {}, { genreId: number; genre: string }>,
  res: Response
) => {
  console.log(req.body);
  console.log(req.params);
  const genreId = req.body.genreId;
  const genre = req.body.genre;
  try {
    const result = await adminUpdateGenre(genreId, genre);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleAdminDeleteGenre = async (
  req: Request<{}, {}, { genreId: number }>,
  res: Response
) => {
  console.log(req.body);
  console.log(req.params);
  const genreId = req.body.genreId;
  try {
    const result = await adminDeleteGenre(genreId);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};
