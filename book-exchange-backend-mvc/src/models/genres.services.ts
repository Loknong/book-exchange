import { PrismaClient } from "@prisma/client";
import {
  CreateGenreRequest,
  UpdateGenreRequest,
} from "../types/base/genres.types";

export const createGenre = async (
  prisma: PrismaClient,
  data: CreateGenreRequest
) => {
  const genre = await prisma.genres.create({ data });
  return genre;
};

export const getGenreById = async (prisma: PrismaClient, id: number) => {
  const genre = await prisma.genres.findUnique({ where: { id } });
  return genre;
};

export const updateGenre = async (
  prisma: PrismaClient,
  id: number,
  data: UpdateGenreRequest
) => {
  const genre = await prisma.genres.update({ where: { id }, data });
  return genre;
};

export const deleteGenre = async (prisma: PrismaClient, id: number) => {
  const genre = await prisma.genres.delete({ where: { id } });
  return genre;
};
