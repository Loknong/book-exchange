import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as services from "./explore.services";

export const handleGetBookListings = async (req: Request, res: Response) => {
  try {
    console.log("params", req.query);
    
    const {
      title,
      author,
      genres,
      sort,
      page = 1,
      limit = 10,
      view,
    } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const bookListings = await services.getBookListings({
      prisma,
      title: title as string,
      author: author as string,
      genres: genres as string,
      sort: sort as string,
      page: pageNumber,
      limit: limitNumber,
      view: view as string,
    });

    res.status(200).json(bookListings);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};
