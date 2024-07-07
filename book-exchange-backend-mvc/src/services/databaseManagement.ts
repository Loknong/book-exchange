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
import { CreateAddressRequest } from "@src/api/user/addresses/address.types";
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
const mockAddresses = [
  {
    userId: 1,
    houseNumber: "123/45",
    village: "Moo 5",
    street: "Sukhumvit Road",
    subdistrict: "Bang Na",
    district: "Bang Na",
    province: "Bangkok",
    postalCode: "10260",
    country: "Thailand",
    phoneNumber: "0812345678",
  },
  {
    userId: 2,
    houseNumber: "789/12",
    village: "Moo 2",
    street: "Rama IV Road",
    subdistrict: "Khlong Toei",
    district: "Khlong Toei",
    province: "Bangkok",
    postalCode: "10110",
    country: "Thailand",
    phoneNumber: "0823456789",
  },
  {
    userId: 3,
    houseNumber: "456/78",
    village: "Moo 4",
    street: "Ratchadaphisek Road",
    subdistrict: "Din Daeng",
    district: "Din Daeng",
    province: "Bangkok",
    postalCode: "10400",
    country: "Thailand",
    phoneNumber: "0834567890",
  },
  {
    userId: 4,
    houseNumber: "321/65",
    village: "Moo 6",
    street: "Phahon Yothin Road",
    subdistrict: "Chatuchak",
    district: "Chatuchak",
    province: "Bangkok",
    postalCode: "10900",
    country: "Thailand",
    phoneNumber: "0845678901",
  },
  {
    userId: 5,
    houseNumber: "654/98",
    village: "Moo 3",
    street: "Sathorn Road",
    subdistrict: "Yannawa",
    district: "Sathorn",
    province: "Bangkok",
    postalCode: "10120",
    country: "Thailand",
    phoneNumber: "0856789012",
  },
  {
    userId: 6,
    houseNumber: "987/21",
    village: "Moo 1",
    street: "Silom Road",
    subdistrict: "Silom",
    district: "Bang Rak",
    province: "Bangkok",
    postalCode: "10500",
    country: "Thailand",
    phoneNumber: "0867890123",
  },
  {
    userId: 7,
    houseNumber: "741/52",
    village: "Moo 8",
    street: "Charoen Krung Road",
    subdistrict: "Samphanthawong",
    district: "Samphanthawong",
    province: "Bangkok",
    postalCode: "10100",
    country: "Thailand",
    phoneNumber: "0878901234",
  },
  {
    userId: 8,
    houseNumber: "852/36",
    village: "Moo 9",
    street: "Ladprao Road",
    subdistrict: "Wang Thonglang",
    district: "Wang Thonglang",
    province: "Bangkok",
    postalCode: "10310",
    country: "Thailand",
    phoneNumber: "0889012345",
  },
  {
    userId: 9,
    houseNumber: "963/74",
    village: "Moo 7",
    street: "Vibhavadi Rangsit Road",
    subdistrict: "Don Mueang",
    district: "Don Mueang",
    province: "Bangkok",
    postalCode: "10210",
    country: "Thailand",
    phoneNumber: "0890123456",
  },
  {
    userId: 10,
    houseNumber: "159/33",
    village: "Moo 10",
    street: "Ngamwongwan Road",
    subdistrict: "Bang Khen",
    district: "Bang Khen",
    province: "Bangkok",
    postalCode: "10220",
    country: "Thailand",
    phoneNumber: "0901234567",
  },
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
  },
  {
    title: "Gone with the Wind",
    author: "Margaret Mitchell",
    genreId: 6,
    condition: "Used",
    description: "A novel about the American Civil War and Reconstruction era.",
    ownerId: Math.floor(Math.random() * 10) + 1,
    status: BookStatus.PUBLIC,
    bookImageId: 0,
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
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
    views: Math.floor(Math.random() * 1000) + 1, // Add this line
  },
];


export const resetDatabase = async (prisma: PrismaClient) => {
  const resetDatabase = prisma.$transaction(async (transactionPrisma) => {
    await databaseModel.resetDatabase(transactionPrisma);
  });
  console.log("Database reset successfully.");
  return { resetDatabase, message: "Reset Database successfully" };
};

export const mockDatabase = async (prisma: PrismaClient) => {
  const createdUsers: UserResponse[] = [];
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
    await genreModel.createGenreMany(transactionPrisma, mockGenres);

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

      await bookModel.updateBook(transactionPrisma, book.id, {
        bookImageId: book.id,
      });
    }

    // Select Feedback Detail
    const tempUserList = await userModel.getUsers(transactionPrisma);
    const newUser = tempUserList.map((user) => {
      const profilePictures = user.profilePictures[0].name
        ? user.profilePictures[0].name
        : null;
      return {
        ...user,
        profilePictures,
      };
    });
    // const genres = await genreModel.getGenreList(transactionPrisma);
    const bookList = await bookModel.getBookList(transactionPrisma);

    return {
      //   createdUsers,
      feedbackUser: newUser,
      //   genre: { genreResult, genreList: genres },
      bookList,
    };
  });
};

export const resetAndMockDatabase = async (prisma: PrismaClient) => {
  return prisma.$transaction(async (transactionPrisma) => {
    // Reset Database
    await databaseModel.resetDatabase(transactionPrisma);
    console.log("Database reset successfully.");

    // Mock User Info
    for (let index = 0; index < mockUsers.length; index++) {
      const tempUser = await userModel.createUser(
        transactionPrisma,
        mockUsers[index]
      );
      const data: CreateUserProfilePictureRequest = {
        userId: tempUser.id,
        name: `user-${tempUser.id}.jpg`,
        isActive: true,
      };
      const profile = await userProfileModel.createUserProfilePicture(
        transactionPrisma,
        data
      );
      await userModel.updateUser(transactionPrisma, tempUser.id, {
        pictureId: profile.id,
      });
    }

    // Mock User Address
    for (let index = 0; index < mockAddresses.length; index++) {
      const address = await transactionPrisma.userAddress.create({
        data: mockAddresses[index],
      });
      await transactionPrisma.users.update({
        where: { id: mockAddresses[index].userId },
        data: { addressId: address.id },
      });
    }

    // Mock Genres
    await genreModel.createGenreMany(transactionPrisma, mockGenres);

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

      await bookModel.updateBook(transactionPrisma, book.id, {
        bookImageId: bookImage.id,
      });
    }

    // Select Feedback Detail
    const tempUserList = await userModel.getUsers(transactionPrisma);
    const newUser = tempUserList.map((user) => {
      const profilePictures =
        user.profilePictures.length > 0 ? user.profilePictures[0].name : null;

      return {
        ...user,
        profilePictures,
      };
    });

    const bookList = await bookModel.getBookList(transactionPrisma);

    return {
      feedbackUser: newUser,
      bookList,
    };
  });
};

interface TableDescription {
  Field: string;
  Type: string;
  Null: string;
  Key: string;
  Default: string | null;
  Extra: string;
}

interface TableInfo {
  tableName: string;
  description: TableDescription[];
}

export const getTablesAndDescriptions = async (
  prisma: PrismaClient,
  tableName: string | undefined
): Promise<TableInfo[]> => {
  // Get all table names
  const tables: { Tables_in_book_exchange_prisma: string }[] =
    await prisma.$queryRaw`SHOW TABLES`;

  console.log("Show Tables", tables);
  const tempTable = tableName
    ? tables.filter(
        (table) => table.Tables_in_book_exchange_prisma === tableName
      )
    : tables;
  console.log("tempTable", tempTable);

  // Iterate through each table and get its description
  const tableDescriptions: TableInfo[] = await Promise.all(
    tempTable.map(async (table) => {
      const tableName = table.Tables_in_book_exchange_prisma;
      const description: TableDescription[] = await prisma.$queryRawUnsafe(
        `DESCRIBE ${tableName}`
      );

      return {
        tableName,
        description,
      };
    })
  );
  // console.log("tableDescriptions", tableDescriptions);
  return tableDescriptions;
};
