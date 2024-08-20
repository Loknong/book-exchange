import React from "react";
import Button from "./base/Button";
import Card from "./base/Card";

interface Book {
  id: string;
  title: string;
  author: string;
  status: string;
  imageUrl: string; // Adding an image URL for the book cover
}

interface BookCardProps {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <Card title={book.title} shadow="md" className="flex flex-col items-center">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-32 h-48 mb-4 rounded-lg shadow-lg object-cover"
      />
      <p className="text-lg font-semibold">{book.author}</p>
      <p
        className={`text-sm ${
          book.status === "Available" ? "text-green-600" : "text-red-600"
        }`}
      >
        {book.status}
      </p>
      <div className="mt-4 flex space-x-2">
        <Button variant="primary" onClick={onEdit} shadow="sm">
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete} shadow="sm">
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default BookCard;
