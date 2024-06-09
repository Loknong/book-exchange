import { Request, Response } from "express";
import { pool } from "../../services/db";
import { addBook } from "../../services/legacy/bookService";

export const handleAddBook = async (req: Request, res: Response) => {
  console.log(req.body);

  const { title, author, genre, bookCondition, description, ownerId } =
    req.body;
  const thumbnail = req.file?.filename;

  if (!thumbnail) {
    return res.status(400).json({ error: "Thumbnail image is required" });
  }

  try {
    const book = await addBook({
      title,
      author,
      genre,
      bookCondition,
      description,
      ownerId,
      thumbnail,
    });

    if (book) {
      res.status(201).json(book);
    } else {
      res.status(500).json({ error: "Failed to add the book" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
};

// Fetch All Book
export const getBooks = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
