import { PrismaClient } from "@prisma/client";
import { PrismaTransactionClient } from "@src/types/utils/primaAlias.types";
import {
  CreateGenreRequest,
  GenreResponse,
  UpdateGenreRequest,
} from "../types/base/genres.types";

export const createGenre = async (
  prisma: PrismaTransactionClient,
  data: CreateGenreRequest
) => {
  const genre = await prisma.genres.create({ data });
  return genre;
};

export const createGenreMany = async (
  prisma: PrismaTransactionClient,
  data: CreateGenreRequest[]
) => {
  const genres = await prisma.genres.createMany({data});
  return genres
}

export const getGenreById = async (prisma: PrismaTransactionClient, id: number) => {
  const genre = await prisma.genres.findUnique({ where: { id } });
  return genre;
};

export const getGenreList = async (prisma: PrismaTransactionClient): Promise<GenreResponse[]> => {
  const genres = await prisma.genres.findMany()
  return genres
}

export const updateGenre = async (
  prisma: PrismaTransactionClient,
  id: number,
  data: UpdateGenreRequest
) => {
  const genre = await prisma.genres.update({ where: { id }, data });
  return genre;
};

export const deleteGenre = async (prisma: PrismaTransactionClient, id: number) => {
  const genre = await prisma.genres.delete({ where: { id } });
  return genre;
};
