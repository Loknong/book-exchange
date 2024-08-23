// book-exchange-frontend/src/components/books/BookCard.tsx
import React from "react";
import Card from "../base/Card";
import type { BookCard } from "../../models/Books";
import Book from "../../assets/react.svg"

interface BookCardProps {
  book: BookCard;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Card title={book.title}>
      <img
        src={Book}
        alt={book.title}
        className="w-full h-48 object-fill rounded-t border p-2 py-4"
      />
      <div className="px-4">
        <h2 className="text-xl font-bold">{book.title}</h2>
        <p className="text-gray-700">by {book.author}</p>
        <p className="text-gray-600">Genre: {book.genreId}</p>
        <p className="text-gray-600">Condition: {book.condition}</p>
        <p className="text-gray-600">Views: {book.views}</p>
        <p className="mt-2 text-gray-800">{book.description}</p>
      </div>
    </Card>
  );
};

export default BookCard;
