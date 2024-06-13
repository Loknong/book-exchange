import { pool } from "../db";
import { Book } from "@src/interfaces/legacy/Books";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

// insert book detail to database
// after that check that book is insert or not by check by have insertId
// handle that error too if inse
// export const addBook = async (book: Partial<Book>): Promise<Book | null> => {
//     console.log('Enter Add book');

//   const connection = await pool.getConnection();

//   try {
//     const [result] = await connection.query<ResultSetHeader>(
//       `INSERT INTO books (title, author, genre, bookCondition, description, ownerId, thumbnail)
//     VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       [
//         book.title,
//         book.author,
//         book.genre,
//         book.bookCondition,
//         book.description,
//         book.ownerId,
//         book.thumbnail,
//       ]
//     );

//     const insertId = result.insertId;

//     const [rows] = await connection.query<RowDataPacket[]>(
//       `SELECT * FROM books WHERE bookId = ?`,
//       [insertId]
//     );

//     if (rows.length > 0) {
//       return (rows as Book[])[0];
//     } else {
//       throw new Error("User not found after insertion");
//     }
//   } catch (error) {
//     if (error instanceof Error)
//       console.error(`Error adding book: ${error.message}`);
//     return null;
//   } finally {
//     connection.release();
//   }
// };

//! Add Book
export const addBook = async (book: Partial<Book>): Promise<Book | null> => {
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO books (title, author, genreId, bookCondition, description, ownerId, thumbnail)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        book.title,
        book.author,
        book.genre,
        book.bookCondition,
        book.description,
        book.ownerId,
        book.thumbnail,
      ]
    );

    const insertId = result.insertId;

    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM books WHERE bookId = ?`,
      [insertId]
    );

    if (rows.length > 0) {
      return (rows as Book[])[0];
    } else {
      throw new Error("Book not found after insertion");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error adding book: ${error.message}`);
    }
    return null;
  } finally {
    connection.release();
  }
};
