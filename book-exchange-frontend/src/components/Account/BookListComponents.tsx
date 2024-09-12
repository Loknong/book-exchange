import React from "react";

const BookList: React.FC = () => {
  const books = [
    { title: "The Catcher in the Rye", status: "Active" },
    { title: "To Kill a Mockingbird", status: "Inactive" },
    { title: "The Hobbit", status: "Active" },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Listed Books</h3>
      <ul>
        {books.map((book, index) => (
          <li key={index} className="mb-2">
            <p className="text-sm text-gray-700">{book.title}</p>
            <p className={`text-xs ${book.status === "Active" ? "text-green-500" : "text-red-500"}`}>
              {book.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
