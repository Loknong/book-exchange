import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductImg from "../assets/book.jpg";
import OtherImage from "../assets/images/complete.png";

// Enums for specific values
enum ConditionEnum {
  NEW = "New",
  USED_LIKE_NEW = "Used - Like New",
  USED_GOOD = "Used - Good",
  USED_ACCEPTABLE = "Used - Acceptable",
}

enum AvailabilityStatusEnum {
  AVAILABLE = "Available",
  PENDING = "Pending",
  EXCHANGED = "Exchanged",
}

// Interface for the owner details
interface BookOwner {
  username: string;
  location: string;
  memberSince: string; // Assuming a string format like "January 2021"
}

// Interface for the exchange-related options
interface ExchangeOptions {
  preferredBooks: string[]; // Array of book titles that the owner prefers for exchange
  exchangeLocation: string; // Location where the exchange can occur
  exchangeCondition: string; // Condition required for the exchange
}

// Interface for availability details
interface Availability {
  status: AvailabilityStatusEnum;
  listedDate: string; // Assuming a string format for date like "August 15, 2024"
}

// Main Book interface
interface Book {
  id: string; // Assuming the ID is a string
  title: string;
  author: string;
  condition: ConditionEnum;
  views: number;
  description: string;
  genres: string[]; // Array of genres
  language: string;
  images: string[]; // Array of image URLs or paths
  owner: BookOwner;
  exchangeOptions: ExchangeOptions;
  availability: Availability;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock fetching book details based on the ID
  const book: Book = {
    id: id ?? "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    condition: ConditionEnum.NEW,
    views: 150,
    description:
      "The Great Gatsby is a novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922.",
    genres: ["Classics", "Fiction"],
    language: "English",
    images: [ProductImg, OtherImage], // More than 5 images
    owner: {
      username: "BookLover123",
      location: "New York, USA",
      memberSince: "January 2021",
    },
    exchangeOptions: {
      preferredBooks: ["1984", "To Kill a Mockingbird"],
      exchangeLocation: "Local meet-up or mail",
      exchangeCondition: "Book of similar condition or better",
    },
    availability: {
      status: AvailabilityStatusEnum.AVAILABLE,
      listedDate: "August 15, 2024",
    },
  };

  const [selectedImage, setSelectedImage] = useState<string>(book.images[0]);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="md:container mx-auto px-4 py-6">
      {/* Book details rendering */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-white p-4 shadow rounded h-fit">
            <img
              src={selectedImage}
              alt={book.title}
              className="w-full h-[350px]  object-cover rounded"
            />
          </div>
          <div className="flex overflow-x-auto space-x-2 mt-4">
            {book.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${book.title} - ${index + 1}`}
                className={`h-24 w-24 object-cover rounded cursor-pointer ${
                  image === selectedImage ? "border-2 border-primary" : ""
                }`}
                onClick={() => handleImageSelect(image)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {book.title}
          </h2>
          <p className="text-lg text-gray-600 mb-4">By {book.author}</p>
          <p className="text-md text-gray-600 mb-4">
            Condition: {book.condition}
          </p>
          <p className="text-md text-gray-600 mb-4">Views: {book.views}</p>
          <p className="text-md text-gray-600 mb-4">
            Language: {book.language}
          </p>
          <div className="mb-4">
            <span className="text-sm text-gray-500">Genres:</span>
            <ul className="flex gap-2">
              {book.genres.map((genre) => (
                <li
                  key={genre}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                >
                  {genre}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-md text-gray-600 mb-4">{book.description}</p>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Owner Details
            </h3>
            <p className="text-md text-gray-600">
              <strong>Username:</strong> {book.owner.username}
            </p>
            <p className="text-md text-gray-600">
              <strong>Location:</strong> {book.owner.location}
            </p>
            <p className="text-md text-gray-600">
              <strong>Member Since:</strong> {book.owner.memberSince}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Exchange Details
            </h3>
            <p className="text-md text-gray-600">
              <strong>Preferred Books for Exchange:</strong>{" "}
              {book.exchangeOptions.preferredBooks.join(", ")}
            </p>
            <p className="text-md text-gray-600">
              <strong>Exchange Location:</strong>{" "}
              {book.exchangeOptions.exchangeLocation}
            </p>
            <p className="text-md text-gray-600">
              <strong>Condition Required:</strong>{" "}
              {book.exchangeOptions.exchangeCondition}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Availability
            </h3>
            <p className="text-md text-gray-600">
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  book.availability.status === AvailabilityStatusEnum.AVAILABLE
                    ? `text-green-500`
                    : ""
                } ${
                  book.availability.status === AvailabilityStatusEnum.PENDING
                    ? `text-yellow-500`
                    : ""
                } ${
                  book.availability.status === AvailabilityStatusEnum.EXCHANGED
                    ? `text-red-500`
                    : ""
                }`}
              >
                {book.availability.status}
              </span>
            </p>
            <p className="text-md text-gray-600">
              <strong>Listed Date:</strong> {book.availability.listedDate}
            </p>
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition">
            Request Exchange
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
