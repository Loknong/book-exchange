import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as services from "./genre.services";
import { ResponseHandler } from "@src/api/utils/ApiResponse";

export const handleCreateGenres = async (
  req: Request<{}, {}, { name: string }>,
  res: Response
) => {
  try {
    const genre = await services.addGenres(prisma, req.body.name);
    const response = new ResponseHandler(
      "success",
      "Genre created successfully",
      genre
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

export const handleGetGenres = async (req: Request, res: Response) => {
  try {
    const genres = await services.getGenres(prisma);
    const response = new ResponseHandler(
      "success",
      "Genres fetched successfully",
      genres
    );
    res.status(200).json(response);
  } catch (error) {
    const response = new ResponseHandler(
      "error",
      "An error occured while fetching genres",
      undefined,
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
    res.status(500).json(response);
  }
};

export const handleUpdateGenre = async (
  req: Request<{ genreId: number }, {}, { name: string; isAdmin: boolean }>,
  res: Response
) => {
  const id = Number(req.params.genreId);

  const name = req.body.name;

  try {
    if (req.body.isAdmin) {
      const genre = await services.updateGenres(prisma, id, name);
      const response = new ResponseHandler(
        "success",
        "Genre updated successfully",
        genre
      );
      res.status(200).json(response);
    } else {
      throw new Error("Only admin roles can update genres");
    }
  } catch (error) {
    const response = new ResponseHandler(
      "error",
      "An error occured while updating genre",
      undefined,
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
    res.status(500).json(response);
  }
};

export const handleDeleteGenre = async (
  req: Request<{ genreId: number }, {}, {}>,
  res: Response
) => {
  const genreId = Number(req.params.genreId);
  try {
    const genre = await services.deleteGenres(prisma, genreId);
    const response = new ResponseHandler(
      "success",
      "Genre deleted successfully",
      genre
    );
    res.status(200).json(response);
  } catch (error) {
    const response = new ResponseHandler(
      "error",
      "An error occured while updating genre",
      undefined,
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
    res.status(500).json(response);
  }
};
