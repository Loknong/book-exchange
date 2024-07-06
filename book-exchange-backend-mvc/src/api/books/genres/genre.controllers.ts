import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as services from "./genre.services";

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

export const handleCreateGenres = async (
  req: Request<{}, {}, { name: string }>,
  res: Response
) => {
  try {
    const genre = await services.addGenres(prisma, req.body.name);
    res.status(200).json(genre);
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
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
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
      res.status(200).json(genre);
    } else {
      throw new Error("Only admin roles can update genres");
    }
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

export const handleDeleteGenre = async (
  req: Request<{ genreId: number }, {}, {}>,
  res: Response
) => {
  const genreId = Number(req.params.genreId);
  try {
    const genre = await services.deleteGenres(prisma, genreId);
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};
