import { PrismaClient } from "@prisma/client";
import { PrismaTransactionClient } from "@src/types/utils/primaAlias.types";
import {
  BookResponse,
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

export const getBookList = async (prisma: PrismaTransactionClient) => {
  const tempBooks = await prisma.books.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      views: true,
      condition: true,
      description: true,
      status: true,
      genre: {
        select: {
          name: true,
        },
      },
      owner: {
        select: {
          // id: true,
          firstName: true,
          lastName: true,
          email: true,
          // pictureId: true,
          profilePictures: {
            where: { isActive: true },
            select: {
              name: true,
            },
          },
        },
      },
      
    },
  });
  const adjustedBooks = tempBooks.map((book) => ({
    ...book,
    genre: book.genre.name,
    owner: {
      ...book.owner,
      profilePictures: book.owner.profilePictures[0]?.name || null,
    },
  }));

  return adjustedBooks;
};

export const getBookById = async (
  prisma: PrismaTransactionClient,
  id: number
) => {
  const book = await prisma.books.findUnique({ where: { id } });

  return book;
};

export const updateBook = async (
  prisma: PrismaTransactionClient,
  id: number,
  data: UpdateBookRequest
): Promise<BookResponse> => {
  const book = await prisma.books.update({ where: { id }, data });
  return book;
};

export const deleteBook = async (
  prisma: PrismaTransactionClient,
  id: number
) => {
  const book = await prisma.books.delete({ where: { id } });
  return book;
};
