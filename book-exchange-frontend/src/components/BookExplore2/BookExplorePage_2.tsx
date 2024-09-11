import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import SelectLimit from "./SelectLimit"; // Import the SelectLimit component
import Pagination from "./Pagination"; // Import the Pagination component
import SidebarFilter from "./SideBarFilter";
import { conditionFilters, genreFilters, languageFilters } from "../../utils/mock/FilterData";
import axios from "axios";

const TOTAL_BOOKS = 1000; // Assuming maximum of 1000 books per subject

const BookExplorePage: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewLimit, setViewLimit] = useState(10); // Default limit is 10 books per page
  const [currentPage, setCurrentPage] = useState(1); // Default page is 1
  const [selectedGenre, setSelectedGenre] = useState<string>("Adventure"); // Default genre on page load

  const totalPages = Math.ceil(TOTAL_BOOKS / viewLimit); // Calculate total pages based on the viewLimit

  // Fetch books from OpenLibrary with pagination (offset = currentPage - 1 * viewLimit)
  const fetchBooks = async () => {
    const offset = (currentPage - 1) * viewLimit; // Calculate the offset based on current page and limit
    const genre = selectedGenre.toLowerCase(); // Use the selected genre

    try {
      const response = await axios.get(`https://openlibrary.org/subjects/${genre}.json?limit=${viewLimit}&offset=${offset}`);
      const data = response.data;
      setBooks(data.works); // 'works' contains the list of books
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [viewLimit, currentPage, selectedGenre]); // Re-fetch books when viewLimit, currentPage or selectedGenre change

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="md:container grid grid-cols-4 gap-6 pt-4 pb-16 items-start">

      {/* Sidebar */}
      <div className="lg:col-span-1 lg:block hidden bg-white px-4 pb-6 items-start shadow rounded overflow-hidden">
        <div className="divide-y divide-gray-200 space-y-5">
          <SidebarFilter
            title="Genres"
            options={genreFilters}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
          <SidebarFilter
            title="Condition"
            options={conditionFilters}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre} // If you want to extend it to conditions in the future
          />
          <SidebarFilter
            title="Language"
            options={languageFilters}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre} // For language as well
          />
        </div>
      </div>

      {/* Book Grid */}
      {
        loading && <div role="status" className="col-span-3 h-full  text-center flex justify-center items-center">
          <svg aria-hidden="true" className="w-72 h-72 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
        </div>
      }
      {
        !loading && <div className="lg:col-span-3 col-span-4">

          {/* Show the selected genre */}
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Showing books for: {selectedGenre}
            </h2>
          </div>

          {/* Integrate the SelectLimit component */}
          <SelectLimit viewLimit={viewLimit} onViewLimitChange={setViewLimit} />

          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-4 gap-2">
            {books.map((book) => (
              <BookCard
                key={book.key} // Use the work key as unique identifier
                coverId={book.cover_id} // Use the cover_id field from OpenLibrary
                title={book.title}
                author={book.authors?.[0]?.name || "Unknown Author"} // Handle missing authors
                link={`/product${book.key}`} // Use the work key to navigate
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      }

    </div>
  );
};

export default BookExplorePage;
