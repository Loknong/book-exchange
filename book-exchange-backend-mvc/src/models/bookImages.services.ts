import { PrismaClient } from "@prisma/client";
import {
  CreateBookImageRequest,
  UpdateBookImageRequest,
} from "../types/base/bookImages.types";

export const craeteBookImage = async (
  prisma: PrismaClient,
  data: CreateBookImageRequest
) => {
  const bookImage = await prisma.bookImages.create({ data });
  return bookImage;
};

export const getBookImageById = async (prisma: PrismaClient, id: number) => {
  const bookImage = await prisma.bookImages.findUnique({ where: { id } });
  return bookImage;
};

export const updateBookImage = async (
  prisma: PrismaClient,
  id: number,
  data: UpdateBookImageRequest
) => {
  const bookImage = await prisma.bookImages.update({ where: { id }, data });
  return bookImage;
};

export const deleteBookImage = async (prisma: PrismaClient, id: number) => {
  const bookImage = await prisma.bookImages.delete({ where: { id } });
  return bookImage;
};
