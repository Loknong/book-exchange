import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";

interface BookCardProps {
  coverId: number | undefined; // The cover ID to fetch the image from OpenLibrary
  title: string;
  author: string;
  link: string; // Link to navigate to the book detail page
}

const BookCard: React.FC<BookCardProps> = ({ coverId, title, author, link }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(link); // Navigate to the book detail page
  };

  return (
    <div
      className="lg:px-4 md:px-2 px-1 py-4 bg-white shadow rounded overflow-hidden group"
      onClick={handleNavigate}
      style={{ cursor: "pointer" }}
    >
      <div className="relative">
        {coverId ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
            alt={title}
            className="w-full object-cover h-32 md:h-48 lg:h-56"
          />
        ) : (
          <div className="w-full h-32 md:h-48 lg:h-56 bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
          <div
            className="bg-primary text-white text-lg rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 transition"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation on icon click
            }}
          >
            <FaSearch />
          </div>
          <div
            className="bg-primary text-white text-lg rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 transition"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation on icon click
              // Add any specific action for the heart icon here
            }}
          >
            <FaHeart />
          </div>
        </div>
      </div>
      <div className="pt-4 pb-3 md:px-4 px-2">
        <h4 className="uppercase font-medium text-sm md:text-md lg:text-lg mb-2 text-gray-800 hover:text-primary transition">
          {title}
        </h4>
        <p className="text-xs md:text-sm text-gray-600">By {author}</p>
        <div className="flex items-center">
          <p className="text-xs md:text-sm text-gray-600">
            Condition: {'mock-good'}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-xs md:text-sm text-gray-600">Views: {20}</p>
        </div>
      </div>
      <div
        className="bg-primary border border-primary rounded-b text-white w-full block py-1 text-sm md:text-base lg:text-lg hover:bg-transparent hover:text-primary transition text-center"
        onClick={handleNavigate}
      >
        View Details
      </div>
    </div>
  );
};

export default BookCard;
