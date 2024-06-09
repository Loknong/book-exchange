import { pool } from "./db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User, UserEdit } from "@src/interfaces/User";
import { Book, BookCreate, BookUpdate } from "@src/interfaces/Book";

export const getUserProfile = async (userId: string): Promise<User | null> => {
  const connection = await pool.getConnection();
  try {
    const [row] = await connection.query<RowDataPacket[]>(
      `SELECT firstName, lastName, email, username, credit, userProfilePictures.pictureName FROM users
      LEFT JOIN userProfilePictures
      ON users.userPictureId = userProfilePictures.pictureId where users.userId = ?`,
      [userId]
    );
    if (row.length === 0) throw new Error("Cannot find this user profile");
    return (row as User[])[0];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error get user profile"
    );
  } finally {
    connection.release();
  }
};

// Version 1
export const updateUserProfile2 = async (user: UserEdit) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE users SET firstName = ?, lastName = ?, email = ? where userId = ?",
      [user.firstName, user.lastName, user.email, user.userId]
    );
    if (result.affectedRows === 0)
      throw new Error("Error update user profile not successfully");
    const [row] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users where userId = ?",
      [user.userId]
    );
    if (row.length === 0)
      throw new Error("Error cant select user after update");
    return { message: "Update user profile succesfully", user: row[0] };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error Update user profile"
    );
  } finally {
    connection.release();
  }
};

// Version 2 handle null value for field that user not fill.
// Fetch old info as base data
export const updateUserProfile = async (user: UserEdit) => {
  const connection = await pool.getConnection();
  try {
    const [currentRow] = await connection.query<RowDataPacket[]>(
      "SELECT firstName, lastName, email FROM users where userId = ?",
      [user.userId]
    );

    if (currentRow.length === 0) throw new Error("User not found");

    const currentData = currentRow[0];

    const firstName = user.firstName || currentData.firstName;
    const lastName = user.lastName || currentData.lastName;
    const email = user.email || currentData.email;

    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE users SET firstName = ?, lastName = ?, email = ? where userId = ?",
      [firstName, lastName, email, user.userId]
    );
    if (result.affectedRows === 0)
      throw new Error("Error update user profile not successfully");
    const [row] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users where userId = ?",
      [user.userId]
    );
    if (row.length === 0)
      throw new Error("Error cant select user after update");
    return { message: "Update user profile succesfully", user: row[0] };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error Update user profile"
    );
  } finally {
    connection.release();
  }
};

export const addUserBook2 = async (book: BookCreate) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Check if genreId exists in genres table
    const [genreRows] = await connection.query<RowDataPacket[]>(
      "SELECT genreId FROM genres WHERE genreId = ?",
      [book.genreId]
    );
    if (genreRows.length === 0) {
      throw new Error(
        `Genre ID ${book.genreId} does not exist in genres table`
      );
    }

    // Insert into the books table
    const [result] = await connection.query<ResultSetHeader>(
      "INSERT INTO books (title, author, genreId, bookCondition, description, ownerId, thumbnail) VALUES(?, ?, ?, ?, ?, ?, ?)",
      [
        book.title,
        book.author,
        book.genreId,
        book.bookCondition,
        book.description,
        book.ownerId,
        book.thumbnail,
      ]
    );

    if (result.affectedRows === 0) {
      throw new Error("Error adding a book, insertion was not successful");
    }

    const insertId = result.insertId;
    const [row] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM books WHERE bookId = ?",
      [insertId]
    );
    if (row.length === 0) {
      throw new Error("Cannot select book after insert complete");
    }

    await connection.commit();
    return { message: "Insert book successfully", book: row[0] };
  } catch (error) {
    await connection.rollback();
    console.error("Error in addUserBook:", error);
    throw new Error(
      error instanceof Error ? error.message : "Error adding user's new book"
    );
  } finally {
    connection.release();
  }
};

export const addUserBook = async (book: BookCreate) => {
  const connection = await pool.getConnection();
  try {
    console.log("enter add user book try");
    console.log("book", book);

    const [result] = await connection.query<ResultSetHeader>(
      "INSERT INTO books (title, author, genreId, bookCondition, description, ownerId, thumbnail) VALUES(?, ?, ?, ?, ?, ?, ?)",
      [
        book.title,
        book.author,
        book.genreId,
        book.bookCondition,
        book.description,
        book.ownerId,
        book.thumbnail,
      ]
    );
    if (result.affectedRows === 0)
      throw new Error("Error add a book not succesfully");
    const insertId = result.insertId;
    const [row] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM books where bookId = ?",
      [insertId]
    );
    if (row.length === 0)
      throw new Error("Can not select book after insert complete");
    return { message: "Insert book succesfully", book: row[0] };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error add user's new book"
    );
  } finally {
    connection.release();
  }
};

export const getUserInventory = async (ownerId: string) => {
  const connection = await pool.getConnection();
  try {
    const [row] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM books where ownerId = ?",
      [ownerId]
    );
    if (row.length === 0) throw new Error("No book for user");
    return { message: "Get user books succesfully", books: row };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error can't get user book inventory"
    );
  } finally {
    connection.release();
  }
};

export const updateBookStatus = async (
  bookId: number,
  status: "public" | "private"
) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE books SET status = ? WHERE bookId = ?",
      [status, bookId]
    );

    if (result.affectedRows === 0)
      throw new Error("Update book status not succesfully");

    const [row] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM books where bookId = ?",
      [bookId]
    );

    if (row.length === 0)
      throw new Error("Cant select book that update Status");
    return { message: "Change book status succesfully", book: row[0] };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error Update user profile"
    );
  } finally {
    connection.release();
  }
};

// Version 1
export const uploadProfilePicture2 = async (
  userId: number,
  userPicture?: string
) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE users SET thumbnail = ? where userId = ?",
      [userPicture, userId]
    );
    if (result.affectedRows === 0)
      throw new Error("Update profile picture not succesfully");
    console.log("this");

    const [row] = await connection.query<RowDataPacket[]>(
      "SELECT thumbnail FROM users where userId = ?",
      [userId]
    );
    if (row.length === 0) throw new Error("Picture that update cant select");

    return { message: "Upload profile picture succesfully", user: row[0] };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error Update user profile"
    );
  } finally {
    connection.release();
  }
};

// Version 2 - We add table to store profile Images
/**
 * 1) insert to userProfilePictures
 * 2) select check
 * 3) select current userId is exist
 * 4) update profileId with insertId
 */
export const uploadProfilePicture3 = async (
  userId: number,
  userPicture?: string
) => {
  const connection = await pool.getConnection();
  try {

    // Insert to userProfilePictires
    const [pictureResults] = await connection.query<ResultSetHeader>(
      `INSERT INTO userProfilePictures (userId, pictureName, isActive) VALUES(?, ?, 1)`,
      [userId, userPicture]
    );
    if (pictureResults.affectedRows === 0)
      throw new Error("Error to upload image");
    // Select Check
    const pictureId = pictureResults.insertId;
    const [pictureRow] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM userProfilePictures where pictureId = ?`,
      [pictureId]
    );
    if (pictureRow.length === 0) throw new Error("Image not found!");

    // Select current user is exist
    const [curretUserRow] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM users where userId = ? `,
      [userId]
    );
    if (curretUserRow.length === 0) throw new Error("User not found");

    // Update profileId to new images Id
    const [updateUserResult] = await connection.query<ResultSetHeader>(
      `UPDATE users SET userPictureId = ? where userId = ?`,
      [pictureId, userId]
    );

    if (updateUserResult.affectedRows === 0)
      throw new Error("Update profile picture not succesfully");
    console.log("this");

    const [row] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users where userId = ?",
      [userId]
    );
    if (row.length === 0) throw new Error("Picture that update cant select");

    return { message: "Upload profile picture succesfully", user: row[0] };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error Update user profile"
    );
  } finally {
    connection.release();
  }
};

// Version 3 add transaction()
export const uploadProfilePicture = async (
  userId: number,
  userPicture?: string
) => {
  const connection = await pool.getConnection();
  try {

    await connection.beginTransaction()
    // Insert to userProfilePictires
    const [pictureResults] = await connection.query<ResultSetHeader>(
      `INSERT INTO userProfilePictures (userId, pictureName, isActive) VALUES(?, ?, 1)`,
      [userId, userPicture]
    );
    if (pictureResults.affectedRows === 0)
      throw new Error("Error to upload image");
    // Select Check
    const pictureId = pictureResults.insertId;
    const [pictureRow] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM userProfilePictures where pictureId = ?`,
      [pictureId]
    );
    if (pictureRow.length === 0) throw new Error("Image not found!");

    // Select current user is exist
    const [curretUserRow] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM users where userId = ? `,
      [userId]
    );
    if (curretUserRow.length === 0) throw new Error("User not found");

    // Update profileId to new images Id
    const [updateUserResult] = await connection.query<ResultSetHeader>(
      `UPDATE users SET userPictureId = ? where userId = ?`,
      [pictureId, userId]
    );

    if (updateUserResult.affectedRows === 0)
      throw new Error("Update profile picture not succesfully");
    console.log("this");

    const [row] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users where userId = ?",
      [userId]
    );
    if (row.length === 0) throw new Error("Picture that update cant select");
    await connection.commit(); // Commit transaction
    return { message: "Upload profile picture succesfully", user: row[0] };
  } catch (error) {
    await connection.rollback(); // Rollback transaction on error
    throw new Error(
      error instanceof Error ? error.message : "Error Update user profile"
    );
  } finally {
    connection.release();
  }
};


export const deleteUserAccount = async () => {
  const connection = await pool.getConnection();
  try {
    return { message: "delete user accout not implement yet." };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error Update user profile"
    );
  } finally {
    connection.release();
  }
};
