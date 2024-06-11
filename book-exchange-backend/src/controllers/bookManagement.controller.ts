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
} from "@src/services/bookManagement.services";
import { Request, Response } from "express";

//! NOT IMPLETMENT YET
// export const handleGetAllBook = async (req: Request, res: Response) => {
//   console.log(req.body);
//   console.log(req.params);

//   try {
//     const result = await getBooksList();
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(401).json({
//       error:
//         error instanceof Error ? error.message : "Unexpected error occurred",
//     });
//   }
// };

export const handleGetAllBook = async (req: Request, res: Response) => {
  try {
    const { search, filter, sort } = req.query;
    console.log(req.query);
    const result = await getBooksList({
      search: search as string,
      filter: filter as string,
      sort: sort as string,
    });


    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleGetBook = async (
  req: Request<{ bookId: number }>,
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
  req: Request<{}, {}, { genreName: string }>,
  res: Response
) => {
  console.log(req.body);
  const genreName = req.body.genreName;
  console.log(genreName);

  try {
    if (!genreName) throw new Error("genreName is falsy");
    const result = await adminAddNewGenre(genreName);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleUpdateGenre = async (
  req: Request<{ genreId: number }, {}, { genreName: string }>,
  res: Response
) => {
  console.log(req.body);
  console.log(req.params);
  const genreId = req.params.genreId;
  const genreName = req.body.genreName;
  try {
    console.log("genreId", genreId);
    console.log("genreName", genreName);

    const result = await adminUpdateGenre(genreId, genreName);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleAdminDeleteGenre = async (
  req: Request<{ genreId: number }>,
  res: Response
) => {
  console.log(req.body);
  console.log(req.params);
  const genreId = req.params.genreId;
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
