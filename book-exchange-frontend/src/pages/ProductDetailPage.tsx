import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import books from "../utils/mock/Books";

import { AvailabilityStatusEnum } from "../utils/mock/Books";


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Find the book with the matching ID
  const book = books.find((book) => book.id === id);

  if (!book) {
    return <div>Book not found</div>; // Handle the case where the book is not found
  }

  const [selectedImage, setSelectedImage] = useState<string>(book.images[0]);
  const [isWish, setIsWish] = useState<boolean>(false);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };
  useEffect(() => {
    console.log(books);



  }, [])


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
                className={`h-24 w-24 object-cover rounded cursor-pointer ${image === selectedImage ? "border-2 border-primary" : ""
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
                className={`${book.availability.status === AvailabilityStatusEnum.AVAILABLE
                  ? `text-green-500`
                  : ""
                  } ${book.availability.status === AvailabilityStatusEnum.PENDING
                    ? `text-yellow-500`
                    : ""
                  } ${book.availability.status === AvailabilityStatusEnum.EXCHANGED
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
          <div className="flex flex-row space-x-2">
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition">
              Request Exchange
            </button>
            <button
              onClick={() => setIsWish(!isWish)}
              className={` px-4 py-2 rounded 
              ${isWish === true ? `text-white bg-primary-light border-primary`
                  : `bg-primary text-white  hover:bg-primary-dark transition`
                }`}
            >
              Make Wish List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
