import { Request, Response } from "express";
import { pool } from "../../services/db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { IUserOffer } from "@src/interfaces/legacy/userAction";

export const userGetInventory = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.query(
      `
      SELECT
        books.bookId as "bookId",
        users.userId as "userId",
        books.title as "title",
        books.author as "author",
        genres.genre  as "genre",
        books.bookCondition as "bookCondition",
        books.description as "description",
        books.thumbnail as "thumbnail",
        books.createAt as "createAt"
      FROM books
      INNER JOIN users ON users.userId = books.ownerId
      INNER JOIN genres ON genres.genreId  = books.genreId
      WHERE ownerId = ?
      ORDER BY createAt desc
      `,
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: `Internal server error` });
  }
};

export const userOfferBook = async (req: Request, res: Response) => {
  const offer: IUserOffer = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE books SET owner = ? where id = ? AND owner = ?",
      [offer.toUserId, offer.bookId, offer.formUserId]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: `Invalid offer` });
    }
    res.status(200).json({ message: `Book Offered successfully` });
  } catch (error) {
    res.status(500).json({ error: `Internal server error` });
  }
};
