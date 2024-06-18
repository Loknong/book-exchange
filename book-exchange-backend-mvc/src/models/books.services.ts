import { PrismaClient } from "@prisma/client";
import { PrismaTransactionClient } from "@src/types/utils/primaAlias.types";
import {
  CreateBookRequest,
  UpdateBookRequest,
} from "../types/base/books.types";

export const createBook = async (
  prisma: PrismaTransactionClient,
  data: CreateBookRequest
) => {
  const book = await prisma.books.create({ data });
  return book;
};

export const getBookById = async (prisma: PrismaTransactionClient, id: number) => {
  const book = await prisma.books.findUnique({ where: { id } });
  return book;
};

export const updateBook = async (
  prisma: PrismaTransactionClient,
  id: number,
  data: UpdateBookRequest
) => {
  const book = await prisma.books.update({ where: { id }, data });
  return book;
};

export const deleteBook = async (prisma: PrismaTransactionClient, id: number) => {
  const book = await prisma.books.delete({ where: { id } });
  return book;
};
