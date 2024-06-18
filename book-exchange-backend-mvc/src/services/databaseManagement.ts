import { PrismaClient, BookStatus } from "@prisma/client";
import { PrismaTransactionClient } from "@src/types/utils/primaAlias.types";
import * as databaseModel from "../models/database.services";
import * as userModel from "../models/users.services";
import * as userProfileModel from "../models/userProfilePictures.services";
import * as genreModel from "../models/genres.services";
import * as bookModel from "../models/books.services";
import * as bookImagesModel from "../models/bookImages.services";

import {
  BookResponse,
  CreateBookImageRequest,
  CreateBookRequest,
  CreateGenreRequest,
  CreateUserProfilePictureRequest,
  CreateUserRequest,
  UpdateBookRequest,
  UserResponse,
} from "@src/types";

export const resetDatabase = async (prisma: PrismaClient) => {
  const resetDatabase = prisma.$transaction(async (transactionPrisma) => {
    await databaseModel.resetDatabase(transactionPrisma);
  });
  console.log("Database reset successfully.");
  return { resetDatabase, message: "Reset Database successfully" };
};

export const mockDatabase = async (prisma: PrismaClient) => {
  const mockUsers: CreateUserRequest[] = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "johndoe",
      password: "password123",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      username: "janesmith",
      password: "password123",
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      username: "alicejohnson",
      password: "password123",
    },
    {
      firstName: "Bob",
      lastName: "Brown",
      email: "bob.brown@example.com",
      username: "bobbrown",
      password: "password123",
    },
    {
      firstName: "Charlie",
      lastName: "Davis",
      email: "charlie.davis@example.com",
      username: "charliedavis",
      password: "password123",
    },
    {
      firstName: "David",
      lastName: "Wilson",
      email: "david.wilson@example.com",
      username: "davidwilson",
      password: "password123",
    },
    {
      firstName: "Eve",
      lastName: "Taylor",
      email: "eve.taylor@example.com",
      username: "evetaylor",
      password: "password123",
    },
    {
      firstName: "Frank",
      lastName: "Moore",
      email: "frank.moore@example.com",
      username: "frankmoore",
      password: "password123",
    },
    {
      firstName: "Grace",
      lastName: "White",
      email: "grace.white@example.com",
      username: "gracewhite",
      password: "password123",
    },
    {
      firstName: "Henry",
      lastName: "Clark",
      email: "henry.clark@example.com",
      username: "henryclark",
      password: "password123",
    },
  ];
  const mockGenres: CreateGenreRequest[] = [
    { name: "Fiction" },
    { name: "Non-Fiction" },
    { name: "Science Fiction" },
    { name: "Fantasy" },
    { name: "Mystery" },
    { name: "Biography" },
  ];
  const mockBooks: CreateBookRequest[] = [
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genreId: 1,
      condition: "New",
      description:
        "A novel about the serious issues of rape and racial inequality.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "1984",
      author: "George Orwell",
      genreId: 2,
      condition: "Used",
      description:
        "A dystopian social science fiction novel and cautionary tale about the future.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genreId: 3,
      condition: "New",
      description: "A novel about the American dream and the roaring twenties.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      genreId: 4,
      condition: "Used",
      description: "A fantasy novel about a young wizard's adventures.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genreId: 5,
      condition: "New",
      description:
        "A fantasy novel about the quest of home-loving hobbit Bilbo Baggins.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genreId: 6,
      condition: "Used",
      description:
        "A romantic novel that charts the emotional development of the protagonist.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genreId: 1,
      condition: "New",
      description: "A novel about the challenges of teenage life.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      genreId: 2,
      condition: "Used",
      description:
        "The writings from the Dutch language diary kept by Anne Frank.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "Animal Farm",
      author: "George Orwell",
      genreId: 3,
      condition: "New",
      description:
        "An allegorical novella reflecting events leading up to the Russian Revolution.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "The Book Thief",
      author: "Markus Zusak",
      genreId: 4,
      condition: "Used",
      description:
        "A historical novel about a young girl's experiences in Nazi Germany.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      genreId: 5,
      condition: "New",
      description: "An epic high-fantasy novel set in Middle-earth.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "Gone with the Wind",
      author: "Margaret Mitchell",
      genreId: 6,
      condition: "Used",
      description:
        "A novel about the American Civil War and Reconstruction era.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "The Adventures of Sherlock Holmes",
      author: "Arthur Conan Doyle",
      genreId: 1,
      condition: "New",
      description:
        "A collection of twelve short stories featuring Sherlock Holmes.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      genreId: 2,
      condition: "Used",
      description: "A dystopian novel set in a futuristic World State.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "Wuthering Heights",
      author: "Emily Brontë",
      genreId: 3,
      condition: "New",
      description:
        "A novel about the intense and almost demonic love between Catherine Earnshaw and Heathcliff.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "The Chronicles of Narnia",
      author: "C.S. Lewis",
      genreId: 4,
      condition: "Used",
      description:
        "A series of fantasy novels set in the fictional realm of Narnia.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      genreId: 5,
      condition: "New",
      description: "A novel about the experiences of the eponymous heroine.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      genreId: 6,
      condition: "Used",
      description:
        "A novel about the unlikely friendship between a wealthy boy and the son of his father's servant.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "Moby-Dick",
      author: "Herman Melville",
      genreId: 1,
      condition: "New",
      description: "A novel about the voyage of the whaling ship Pequod.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "War and Peace",
      author: "Leo Tolstoy",
      genreId: 2,
      condition: "Used",
      description: "A novel that chronicles the French invasion of Russia.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
    {
      title: "Hamlet",
      author: "William Shakespeare",
      genreId: 3,
      condition: "New",
      description:
        "A tragedy about Prince Hamlet's revenge against his uncle, Claudius.",
      ownerId: Math.floor(Math.random() * 10) + 1,
      status: BookStatus.PUBLIC,
      bookImageId: 0,
    },
  ];

  const createdUsers: UserResponse[] = [];
  const createBooks: BookResponse[] = [];
  return prisma.$transaction(async (transactionPrisma) => {
    // Mock User Info
    for (let index = 0; index < mockUsers.length; index++) {
      const tempUser = await userModel.createUser(
        transactionPrisma,
        mockUsers[index]
      );
      const data: CreateUserProfilePictureRequest = {
        userId: index + 1,
        name: `user-${index + 1}.jpg`,
        isActive: true,
      };
      const profile = await userProfileModel.createUserProfilePicture(
        transactionPrisma,
        data
      );
      const user = await userModel.updateUser(transactionPrisma, tempUser.id, {
        pictureId: profile.id,
      });

      createdUsers.push(user);
    }
    // Mock Genres
    const genreResult = await genreModel.createGenreMany(
      transactionPrisma,
      mockGenres
    );

    // Mock Books
    for (let index = 0; index < mockBooks.length; index++) {
      const book = await bookModel.createBook(
        transactionPrisma,
        mockBooks[index]
      );
      const data: CreateBookImageRequest = {
        bookId: book.id,
        name: `book-${book.id}.jpg`,
      };
      const bookImage = await bookImagesModel.createBookImage(
        transactionPrisma,
        data
      );

      await bookModel.updateBook(
        transactionPrisma,
        book.id,
        { bookImageId: book.id }
      );

    }

    // Select Feedback Detail
    const userList = await userModel.getUsers(transactionPrisma);
    const genres = await genreModel.getGenreList(transactionPrisma);
    const bookList = await bookModel.getBookList(transactionPrisma)

    return {
    //   createdUsers,
      feedbackUser: userList,
    //   genre: { genreResult, genreList: genres },
      bookList
    };
  });
};
