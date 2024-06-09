import { pool } from "./db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User, UserEdit } from "@src/interfaces/User";
import { Book, BookCreate, BookUpdate } from "@src/interfaces/Book";

export const getUserProfile = async (userId: string): Promise<User | null> => {
  const connection = await pool.getConnection();
  try {
    const [row] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users where userId = ?",
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

export const updateUserProfile = async (user: UserEdit) => {
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

export const addUserBook = async (book: BookCreate) => {
  const connection = await pool.getConnection();
  try {
    console.log('enter add user book try');
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



export const uploadProfilePicture = async (userId : number, userPicture?: string) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>('UPDATE users SET thumbnail = ? where userId = ?',[userPicture, userId])
    if (result.affectedRows === 0) throw new Error ("Update profile picture not succesfully")
        console.log("this");
        
        const [row] = await connection.query<RowDataPacket[]>('SELECT thumbnail FROM users where userId = ?', [userId])
    if (row.length === 0) throw new Error ("Picture that update cant select")

    return { message: "Upload profile picture succesfully", user:row[0] };
  } catch (error) {
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
