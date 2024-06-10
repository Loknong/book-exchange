import { pool } from "./db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const getBooksList = async () => {
  const connection = await pool.getConnection();
  try {
    return { message: "not implement yet" };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred"
    );
  } finally {
    connection.release();
  }
};

export const getBook = async (bookId: number) => {
  const connection = await pool.getConnection();
  try {
    const [bookRow] = await connection.query<RowDataPacket[]>(
      `SELECT books.bookId ,books.title, books.author, genres.genre, books.bookView, books.bookCondition ,books.description , bookImages.imageName, books.createAt FROM books 
      INNER JOIN genres ON books.genreId  = genres.genreId 
      INNER JOIN bookImages ON books.bookId = bookImages.bookId where books.bookId = ?`,
      [bookId]
    );
    if (bookRow.length === 0)
      throw new Error(`Cant find book that bookId is ${bookId}`);
    return { message: "succesfully get book detail", book: bookRow[0] };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred"
    );
  } finally {
    connection.release();
  }
};

export const adminAddBook = async () => {
  return { message: "Admin add book not implement yet." };
};

export const adminUpdateBook = async () => {
  return { message: "Admin update detail book not implement yet." };
};

export const adminDeleteBook = async () => {
  return { message: "Admin delete book not implement yet." };
};

export const getGenres = async () => {
  const connection = await pool.getConnection();
  try {
    const [genreRow] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM genres`
    );
    if (genreRow.length === 0) throw new Error("Error can't find any genre");
    return { message: "succesfully get genres", genres: genreRow };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred"
    );
  } finally {
    connection.release();
  }
};

export const adminAddNewGenre = async (genre: string) => {
  const connection = await pool.getConnection();
  try {
    connection.beginTransaction();
    const [genreResult] = await connection.query<ResultSetHeader>(
      `INSERT INTO genres (genre) VALUES(?)`,
      [genre]
    );
    if (genreResult.affectedRows === 0)
      throw new Error("Error create new genre failed!");
    const genreInsertId = genreResult.insertId;
    const [genreAddRow] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM genres where genreId = ?`,
      [genreInsertId]
    );
    if (genreAddRow.length === 0)
      throw new Error("Error cant find genre that we add");
    const [genresRow] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM genres`
    );
    if (genresRow.length === 0) throw new Error("Error cant get genre List");
    connection.commit();
    return {
      message: "succesfully add genre list",
      genreAdd: genreAddRow[0],
      newGenresList: genresRow,
    };
  } catch (error) {
    connection.rollback();
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred"
    );
  } finally {
    connection.release();
  }
};

export const adminUpdateGenre = async () => {
  // return {messaage: "update genre not implement yet"}
  const connection = await pool.getConnection();
  try {
  } catch (error) {
  } finally {
    connection.release()
  }
};

export const adminDeleteGenre = async () => {
  return { message: "delete genre not implement yet" };
};

// export const getBooksList = async () => {
//     const connection = await pool.getConnection();
//     try {

//     } catch (error) {
//       throw new Error (error instanceof Error ? error.message : "Unexpected error occurred")
//     } finally {
//       connection.release()
//     }
//   }
