import { PrismaClient } from "@prisma/client";
import {
  CreateBookRequest,
  UpdateBookRequest,
} from "../types/base/books.types";

export const createBook = async (
  prisma: PrismaClient,
  data: CreateBookRequest
) => {
  const book = await prisma.books.create({ data });
  return book;
};

export const getBookById = async (prisma: PrismaClient, id: number) => {
  const book = await prisma.books.findUnique({ where: { id } });
  return book;
};

export const updateBook = async (
  prisma: PrismaClient,
  id: number,
  data: UpdateBookRequest
) => {
  const book = await prisma.books.update({ where: { id }, data });
  return book;
};

export const deleteBook = async (prisma: PrismaClient, id: number) => {
  const book = await prisma.books.delete({ where: { id } });
  return book;
};
