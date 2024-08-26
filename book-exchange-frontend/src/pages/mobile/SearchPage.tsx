import { useState, useEffect } from "react";

import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";

import SearchHistory from "../../components/SearchHistory";

const mockHistory = [
  {
    title: "The Great Gatsby",
    img: "https://via.placeholder.com/100x100.png?text=Gatsby",
  },
  {
    title: "To Kill a Mockingbird",
    img: "https://via.placeholder.com/100x100.png?text=Mockingbird",
  },
  {
    title: "1984",
    img: "https://via.placeholder.com/100x100.png?text=1984",
  },
  {
    title: "Pride and Prejudice",
    img: "https://via.placeholder.com/100x100.png?text=Pride+Prejudice",
  },
  {
    title: "Moby-Dick",
    img: "https://via.placeholder.com/100x100.png?text=Moby-Dick",
  },
  {
    title: "War and Peace",
    img: "https://via.placeholder.com/100x100.png?text=War+Peace",
  },
];
const SearchPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [history, setHistory] = useState(mockHistory);
  const [, setQuery] = useState("");

  useEffect(() => {
    // Trigger the slide-in effect after the component mounts
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    // Trigger the slide-out effect before navigating back
    setIsVisible(false);
    setTimeout(() => {
      navigate(-1);
    }, 300); // Match this duration to your transition duration
  };

  const handleSearch = (query: string) => {
    setQuery(query);
    if(query.trim()){
      setHistory([]) // Hide history when ehere's a search query

      const searchResults = mockHistory.filter(
        (book) => book.title.toLowerCase().includes(query.toLowerCase())
      )
      setHistory(searchResults);
    } else {
      setHistory(mockHistory) // Show history when there's no search query
    }
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full min-h-screen bg-white z-50 pt-2 transition-transform duration-300 divide-y-2  divide-gray-300 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex w-full items-center flex-col divide-y divide-gray-300 gap-3">
        <div className="flex-shrink-0 px-4">
          <SearchBar handleClose={handleClose} onSearch={handleSearch} />
        </div>
        <div className="w-full">
          <SearchHistory history={history} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
