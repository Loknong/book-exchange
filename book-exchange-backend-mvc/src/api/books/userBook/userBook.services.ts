import { BookStatus, PrismaClient } from "@prisma/client";
import { AddUserBookPayload } from "./userBook.types";
import { UpdateBookRequest } from "../book.types";
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
      data: { ...data, bookImageId: 1 },
    });

    const createImage = await prismaTransaction.bookImages.create({
      data: { bookId: createBook.id, name: bookCover, isActive: true },
    });

    const updateBook = await prismaTransaction.books.update({
      where: { id: createBook.id },
      data: { bookImageId: createImage.id },
      include: {
        images: { select: { name: true } },
      },
    });

    const resultBook = {
      ...updateBook,
      images: updateBook.images[0].name,
    };

    return resultBook;
  });
};

// Get userBook
export const getUserBook = async (prisma: PrismaClient, ownerId: number) => {
  const userBook = await prisma.books.findMany({ where: { ownerId } });
  console.log("userBook:", userBook);

  return userBook;
};

// Update userBook detail
export const updateUserBookDetail = async (
  prisma: PrismaClient,
  bookId: number,
  data: UpdateBookRequest
) => {
  console.log("BookId", bookId);

  const userBook = await prisma.books.update({ where: { id: bookId }, data });
  return userBook;
};

// Update userBook Image
export const updateUserBookImage = async (
  prisma: PrismaClient,
  bookId: number,
  bookName: string
) => {
  return prisma.$transaction(async (prismaTransaction) => {
    const bookImage = await prismaTransaction.bookImages.create({
      data: { bookId, name: bookName, isActive: true },
    });

    const test = await prismaTransaction.bookImages.updateMany({
      where: { bookId: bookId, id: { not: bookImage.id } },
      data: { isActive: false },
    });
    console.log(test);
    console.log("Book Image", bookImage.id);

    const temps = await prismaTransaction.books.update({
      where: { id: bookId },
      data: { bookImageId: bookImage.id },
    });

    const tempBook = await prismaTransaction.books.findUnique({
      where: { id: temps.id },
      include: { images: { where: { isActive: true } } },
    });

    const book = {
      ...tempBook,
      images: tempBook?.images[0].name,
    };

    return book;
  });
};

// Delete userBook
export const deleteUserBook = async (prisma: PrismaClient, bookId: number) => {
  const userBook = await prisma.books.delete({ where: { id: bookId } });
  console.log("userBook:", userBook);

  return userBook;
};
