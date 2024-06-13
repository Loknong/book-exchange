import { error } from "console";
import { pool } from "./db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { GetBooksListParams } from "@src/interfaces/Book";

//! NOT IMPLETMENT YET
// export const getBooksList = async (filter: string) => {
//   const connection = await pool.getConnection();
//   try {
//     const [getBookList] = await connection.query<
//       RowDataPacket[]
//     >(`SELECT books.bookId ,books.title, books.author, genres.genre, books.bookView, books.bookCondition ,books.description , bookImages.imageName, books.createAt FROM books
//     INNER JOIN genres ON books.genreId  = genres.genreId
//     INNER JOIN bookImages ON books.bookId = bookImages.bookId`); // where genre = ?, order by
//     if (getBookList.length === 0)
//       throw new Error("Error cant get any book in list");
//     return { message: "succesfully to get all books", books: getBookList };
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Unexpected error occurred"
//     );
//   } finally {
//     connection.release();
//   }
// };

export const getBooksList = async ({
  search,
  filter,
  sort,
}: GetBooksListParams) => {
  const connection = await pool.getConnection();
  try {
    let query = `SELECT books.bookId, books.title, books.author, genres.genre, books.bookView, books.bookCondition, books.description, bookImages.imageName, books.createAt
                 FROM books 
                 INNER JOIN genres ON books.genreId = genres.genreId 
                 INNER JOIN bookImages ON books.bookId = bookImages.bookId`;

    const queryParams: string[] = [];

    if (filter) {
      query += ` WHERE genres.genreId = ?`;
      queryParams.push(filter);
    }

    if (search) {
      query += filter ? ` AND books.title LIKE ?` : ` WHERE books.title LIKE ?`;
      queryParams.push(`%${search}%`);
    }

    if (sort) {
      const orderBy =
        sort === "latest" ? "books.createAt DESC" : "books.createAt ASC";
      query += ` ORDER BY ${orderBy}`;
    }

    const [getBookList] = await connection.query<RowDataPacket[]>(
      query,
      queryParams
    );

    if (getBookList.length === 0)
      throw new Error("Error: can't get any book in list");

    return { message: "Successfully retrieved all books", books: getBookList };
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
    // console.log("bookId", bookId);

    if (!bookId) throw new Error("bookId is falsy");
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

export const adminUpdateGenre = async (genreId: number, genre: string) => {
  const connection = await pool.getConnection();
  try {
    if (!genreId) throw new Error("genreId is falsy");
    const [result] = await connection.query<ResultSetHeader>(
      `SELECT * FROM genres where genreId = ?`,
      [genreId]
    );
    if (result.affectedRows === 0)
      throw new Error("Cant select genre fron that id");
    const [updateResult] = await connection.query<ResultSetHeader>(
      `UPDATE genres SET genre = ? where genreId = ?`,
      [genre, genreId]
    );
    if (updateResult.affectedRows === 0)
      throw new Error("Update genres no affected row");

    const [genreRow] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM genres where genreId = ?`,
      [genreId]
    );
    if (genreRow.length === 0) throw new Error("Error find genre that update");
    const [genresRows] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM genres`
    );
    if (genresRows.length === 0) throw new Error("Cant find whole genres");

    return {
      message: "Update genre succesfully",
      updateGenre: genreRow[0],
      genres: genresRows,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred"
    );
  } finally {
    connection.release();
  }
};

export const adminDeleteGenre = async (genreId: number) => {
  const connection = await pool.getConnection();
  try {
    if (!genreId) throw new Error("genreID is falsy");
    const [checkExistResult] = await connection.query<ResultSetHeader>(
      `SELECT * FROM genres where genreId = ?`,
      [genreId]
    );
    if (checkExistResult.affectedRows === 0)
      throw new Error("This genre that want to delete is not exist");
    const [deleteResult] = await connection.query<ResultSetHeader>(
      `DELETE FROM genres where genreId = ?`,
      [genreId]
    );
    if (deleteResult.affectedRows === 0)
      throw new Error(`Cant delete genre that id = ${genreId}`);
    const [genreRows] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM genres`
    );
    if (genreRows.length === 0) throw new Error("Cant find genres");

    return { message: "Delete genre succesfully", newGenres: genreRows };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred"
    );
  } finally {
    connection.release();
  }
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
