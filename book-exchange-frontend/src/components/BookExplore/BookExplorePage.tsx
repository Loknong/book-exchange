import React, { useEffect, useState } from "react";
import SidebarFilter from "./SideBarFilter";
import BookCard from "./BookCard";
import { TfiMenuAlt } from "react-icons/tfi";
import { CgMenuGridO } from "react-icons/cg";
import books from "../../utils/mock/Books";

const genres: string[] = []
// Iterate through each book in the mock data
books.forEach((book) => {
  book.genres.forEach((genre) => {
    // Check if the genre is not already in the array
    if (genres.indexOf(genre) === -1) {
      genres.push(genre); // Add the genre to the array if it's not already present
    }
  });
});

console.log(genres);

const BookExplorePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewLimit, setViewLimit] = useState(10);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const totalBooks = books.length;
  const totalPages = Math.ceil(totalBooks / viewLimit);

  useEffect(() => {
    console.log("Selected", selectedGenres);



  }, [selectedGenres])


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewLimit(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when the limit changes
  };

  const startIndex = (currentPage - 1) * viewLimit;
  const selectedBooks = books.slice(startIndex, startIndex + viewLimit);

  // Generate `sidebarFilters` dynamically inside the component
  const genreCount: Record<string, number> = {};
  const conditionCount: Record<string, number> = {};
  const languageCount: Record<string, number> = {};



  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (genreCount[genre]) {
        genreCount[genre] += 1;
      } else {
        genreCount[genre] = 1;
      }
    });

    const condition = book.condition;
    if (conditionCount[condition]) {
      conditionCount[condition] += 1;
    } else {
      conditionCount[condition] = 1;
    }

    const language = book.language;
    if (languageCount[language]) {
      languageCount[language] += 1;
    } else {
      languageCount[language] = 1;
    }
  });

  const sidebarFilters = [
    {
      title: "Genres",
      options: Object.keys(genreCount)
        .sort((a, b) => a.localeCompare(b))  // Sort genres alphabetically
        .map((genre, index) => ({
          id: `genre-${index + 1}`,
          label: genre,
          count: genreCount[genre],
        })),
    },
    {
      title: "Condition",
      options: Object.keys(conditionCount).map((condition, index) => ({
        id: `condition-${index + 1}`,
        label: condition,
        count: conditionCount[condition],
      })),
    },
    {
      title: "Language",
      options: Object.keys(languageCount).map((language, index) => ({
        id: `language-${index + 1}`,
        label: language,
        count: languageCount[language],
      })),
    },
  ];

  const filteredBooks = selectedGenres.length
    ? selectedBooks.filter((book) =>
      book.genres.some((genre) => selectedGenres.includes(genre))
    )
    : selectedBooks;


  return (
    <div className="md:container grid grid-cols-4 gap-6 pt-4 pb-16 items-start">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:block hidden bg-white px-4 pb-6 items-start shadow rounded overflow-hidden">
        <div className="divide-y divide-gray-200 space-y-5">
          {sidebarFilters.map((filter, index) => (
            <SidebarFilter
              key={index}
              title={filter.title}
              options={filter.options}
              selectedGenres={setSelectedGenres}
            />
          ))}
        </div>
      </div>

      {/* Book List */}
      <div className="lg:col-span-3 col-span-4">
        {/* Sorting */}
        <div className="flex items-center mb-4">
          <select
            className="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
            onChange={handleViewLimitChange}
            value={viewLimit}
          >
            <option value={5}>Show 5</option>
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
          </select>

          <div className="flex gap-2 ml-auto">
            <div className="border border-primary text-xl w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
              <i>
                <CgMenuGridO />
              </i>
            </div>
            <div className="border border-gray-300 text-xl w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer">
              <i>
                <TfiMenuAlt />
              </i>
            </div>
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-4 gap-2">
          {filteredBooks.map((book, index) => (
            <BookCard
              key={index}
              image={book.images[0]}
              title={book.title}
              author={book.author}
              condition={book.condition}
              views={book.views}
              link={`product/${book.id}`}
            />
          ))}

        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-3 py-1 border rounded-l ${currentPage === 1 ? 'bg-gray-200' : 'bg-primary text-white'}`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-white text-primary'}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-3 py-1 border rounded-r ${currentPage === totalPages ? 'bg-gray-200' : 'bg-primary text-white'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookExplorePage;
