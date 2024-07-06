import { BookStatus, PrismaClient } from "@prisma/client";
import { AddUserBookPayload } from "./userBook.types";
// template
export const template = async (prisma: PrismaClient) => {
  const userBook = await prisma.books.findMany();
  console.log("userBook:", userBook);

  return userBook;
};

interface CreateBookRequest {
  title: string;
  author?: string;
  genreId: number;
  condition: string;
  description?: string;
  ownerId: number;
  status: BookStatus;
  bookImageId: number;
}
// Add userBook
export const createUserBook = async (
  prisma: PrismaClient,
  data: CreateBookRequest,
  bookCover: string
) => {
    return prisma.$transaction(async (prismaTransaction) => {
      const createBook = await prismaTransaction.books.create({
        data:{...data, bookImageId: 1} 
      })

      const createImage = await prismaTransaction.bookImages.create({
        
      })

      return
    })
};

// Get userBook
export const getUserBook = async (prisma: PrismaClient, ownerId: number) => {
  const userBook = await prisma.books.findMany({ where: { ownerId } });
  console.log("userBook:", userBook);

  return userBook;
};

// Update userBook

// Delete userBook
export const deleteUserBook = async (prisma: PrismaClient, bookId: number) => {
  const userBook = await prisma.books.delete({ where: { id: bookId } });
  console.log("userBook:", userBook);

  return userBook;
};
