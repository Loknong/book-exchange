// book-exchange-frontend/src/pages/BookShelf.tsx
import React from "react";
import BookCard from "../components/books/BookCard";
import { BookCard as BookCardType } from "../models/Books";

const books: BookCardType[] = [
  {
    bookId: 1,
    title: "Brave New World",
    author: "Aldous Huxley",
    genreId: 2,
    condition: "Used",
    description: "A dystopian novel set in a futuristic World State.",
    ownerId: 1,
    status: "PUBLIC",
    bookImageId: 1,
    views: 123,
    bookView: 0,
    createdAt: undefined,
    updatedAt: undefined,
  },
  // Add more book objects here
];

const BookShelf: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {books.map((book) => (
        <BookCard key={book.bookId} book={book} />
      ))}
    </div>
  );
};

export default BookShelf;
