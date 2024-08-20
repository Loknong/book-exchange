import React from "react";
import BookCard from "../components/books/BookCard";
import { BookCard as BookCardType } from "../models/Books";
import { mockBookData } from "../utils/mockBookData";

const books: BookCardType[] = mockBookData;

const BookShelf: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-7xl w-full">
        {books.map((book) => (
          <BookCard key={book.bookId} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookShelf;
