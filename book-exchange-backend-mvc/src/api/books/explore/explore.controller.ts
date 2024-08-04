import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as services from "./explore.services";
import { ResponseHandler } from "@src/api/utils/ApiResponse";

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
    const response = new ResponseHandler(
      "success",
      "Book listings fetched successfully",
      bookListings
    );

    res.status(200).json(response);
  } catch (error) {
    const response = new ResponseHandler(
      "error",
      "Failed to fetch book listings",
      undefined,
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
    res.status(500).json(response);
  }
};
