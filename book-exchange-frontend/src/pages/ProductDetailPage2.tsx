import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExchangeRequestModal from "../components/ExchangeProcess/ExchangeRequestModal"; // Import the modal component

interface BookDetails {
  title: string;
  authors: Array<{ name: string }>;
  covers?: number[];
  description?: { value: string };
  subjects?: string[];
}

const mockBookData = {
  condition: "Used - Good",
  views: 435,
  language: "English",
  genres: ["Business", "Fiction"],
  owner: {
    username: "User1",
    location: "Location 1",
    memberSince: "January 2021",
  },
  exchangeOptions: {
    preferredBooks: ["Book A", "Book B", "Book C"],
    exchangeLocation: "Local meet-up or mail",
    exchangeCondition: "Book of similar condition or better",
  },
  availability: {
    status: "Available",
    listedDate: "August 15, 2024",
  },
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the book ID from the route params
  const [book, setBook] = useState<BookDetails | null>(null); // State to store book details
  const [loading, setLoading] = useState(true); // State to show loading spinner or message
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Selected image state
  const [isWish, setIsWish] = useState<boolean>(false); // State to handle wishlist
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state

const [isMakeWishList, setIsMakeWishList] = useState<boolean>(false); // State to handle wishlist

  // Fetch the book details from OpenLibrary based on the work ID
  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`https://openlibrary.org/works/${id}.json`); // Use the extracted id
      if (!response.ok) {
        throw new Error("Failed to fetch book details");
      }
      const data = await response.json();
      setBook(data); // Store book details in the state
      if (data.covers?.[0]) {
        setSelectedImage(
          `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
        );
      }
      setLoading(false);
    } catch (err) {
      setError((err as Error).message); // Handle errors
      setLoading(false);
    }
  };


  const makeWishList = async () => {
     setIsMakeWishList(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsWish(!isWish)
    setIsMakeWishList(false)
  }


  useEffect(() => {
    if (id) {
      fetchBookDetails(); // Fetch book details when the component mounts
    }
  }, [id]);

  if (loading) {
    return (
      <div>
        Loading book details...
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>No book found</div>;
  }

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="md:container mx-auto px-4 py-6">
      {/* Breadcrumb navigation */}
      <nav className="text-sm text-gray-500 mb-4">
        <span>Home</span> &gt; <span>Product</span> &gt;{" "}
        <span className="text-gray-700">{book.title}</span>
      </nav>

      {/* Book details rendering */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-white p-4 shadow rounded h-fit">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={book.title}
                className="w-full h-[350px] object-fit rounded"
              />
            ) : (
              <div>No cover available</div>
            )}
          </div>

          {/* Image selector */}
          <div className="flex overflow-x-auto space-x-2 mt-4">
            {book.covers?.slice(0, 5).map((coverId, index) => (
              <img
                key={index}
                src={`https://covers.openlibrary.org/b/id/${coverId}-S.jpg`}
                alt={`${book.title} - ${index + 1}`}
                className={`h-24 w-24 object-fit rounded cursor-pointer ${selectedImage ===
                  `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                  ? "border-2 border-primary"
                  : ""
                  }`}
                onClick={() =>
                  handleImageSelect(
                    `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                  )
                }
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {book.title}
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            By {book.authors?.[0]?.name || "Unknown Author"}
          </p>
          <p className="text-md text-gray-600 mb-4">
            Condition: {mockBookData.condition}
          </p>
          <p className="text-md text-gray-600 mb-4">Views: {mockBookData.views}</p>
          <p className="text-md text-gray-600 mb-4">
            Language: {mockBookData.language}
          </p>
          <div className="mb-4">
            <span className="text-sm text-gray-500">Genres:</span>
            <ul className="flex gap-2">
              {mockBookData.genres.map((genre) => (
                <li
                  key={genre}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                >
                  {genre}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-md text-gray-600 mb-4">
            {book.description?.value || "No description available."}
          </p>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Owner Details
            </h3>
            <p className="text-md text-gray-600">
              <strong>Username:</strong> {mockBookData.owner.username}
            </p>
            <p className="text-md text-gray-600">
              <strong>Location:</strong> {mockBookData.owner.location}
            </p>
            <p className="text-md text-gray-600">
              <strong>Member Since:</strong> {mockBookData.owner.memberSince}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Exchange Details
            </h3>
            <p className="text-md text-gray-600">
              <strong>Preferred Books for Exchange:</strong>{" "}
              {mockBookData.exchangeOptions.preferredBooks.join(", ")}
            </p>
            <p className="text-md text-gray-600">
              <strong>Exchange Location:</strong>{" "}
              {mockBookData.exchangeOptions.exchangeLocation}
            </p>
            <p className="text-md text-gray-600">
              <strong>Condition Required:</strong>{" "}
              {mockBookData.exchangeOptions.exchangeCondition}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Availability
            </h3>
            <p className="text-md text-gray-600">
              <strong>Status:</strong>{" "}
              <span
                className={`${mockBookData.availability.status === "Available"
                  ? `text-green-500`
                  : mockBookData.availability.status === "Pending"
                    ? `text-yellow-500`
                    : `text-red-500`
                  }`}
              >
                {mockBookData.availability.status}
              </span>
            </p>
            <p className="text-md text-gray-600">
              <strong>Listed Date:</strong>{" "}
              {mockBookData.availability.listedDate}
            </p>
          </div>

          <div className="flex flex-row space-x-2">
            <button
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
              onClick={openModal} // Open the modal when the user clicks Request Exchange
            >
              Request Exchange
            </button>
            <button
              onClick={makeWishList}
              disabled={isMakeWishList}
              className={` px-4 py-2 rounded disabled:opacity-50 ${isWish
                ? `text-white bg-primary-light border-primary`
                : `bg-primary text-white hover:bg-primary-dark transition`
                }`}
            >
             {isMakeWishList ? "Loading..." : isWish ? "In Wishlist" : "Make Wish List"}
              {/* {isWish ? "In Wishlist" : "Make Wish List"} */}
            </button>
          </div>
        </div>
      </div>

      {/* Exchange Request Modal */}
      <ExchangeRequestModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default ProductDetailPage;
