import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";

interface BookCardProps {
  image: string;
  title: string;
  author: string;
  condition: string;
  views: number;
  link: string; // This will be used for navigating programmatically
}

const BookCard: React.FC<BookCardProps> = ({
  image,
  title,
  author,
  condition,
  views,
  link,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(link);
  };

  return (
    <div
      className="px-4 py-6 bg-white shadow rounded overflow-hidden group"
      onClick={handleNavigate}
      style={{ cursor: "pointer" }}
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
          <div
            className="bg-primary text-white text-lg rounded-full w-9 h-8 flex items-center justify-center hover:bg-gray-800 transition"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation on icon click
              // Add any specific action for the search icon here
            }}
          >
            <FaSearch />
          </div>
          <div
            className="bg-primary text-white text-lg rounded-full w-9 h-8 flex items-center justify-center hover:bg-gray-800 transition"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation on icon click
              // Add any specific action for the heart icon here
            }}
          >
            <FaHeart />
          </div>
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
          {title}
        </h4>
        <p className="text-sm text-gray-600">By {author}</p>
        <div className="flex items-center">
          <p className="text-sm text-gray-600">Condition: {condition}</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-gray-600">Views: {views}</p>
        </div>
      </div>
      <div
        className="bg-primary border border-primary rounded-b text-white w-full block py-1 hover:bg-transparent hover:text-primary transition text-center"
        onClick={handleNavigate}
      >
       Make an Offer
      </div>
    </div>
  );
};

export default BookCard;
