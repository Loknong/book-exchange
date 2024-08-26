import { useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

interface Props {
  handleClose: () => void;
  onSearch: (query: string) => void;
}
function SearchBar({ handleClose, onSearch }: Props) {
  const [query, setQuery] = useState<string>("");
  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div className=" relative flex md:flex-row flex-row-reverse  md:items-stretch items-center gap-4 md:gap-0">
      <span className="md:absolute block md:left-4 md:top-4 text-2xl text-primary md:text-lg md:text-gray-400">
        <FaSearch />
      </span>
      <input
        type="text"
        className="w-full border md:border-primary border-gray-300 pl-6 md:pl-12 py-1 md:py-3 rounded-full px-36 md:rounded-r-none md:rounded-l-md focus:outline-none"
        placeholder="Search for books"
        value={query}
        onChange={handleInputChanges}
      />
      <button className="hidden md:block bg-primary border border-primary text-white rounded-r-md hover:bg-transparent px-8 md:px-4 hover:text-primary hover:border-l-0 transition">
        Search
      </button>
      <i
        className="md:hidden   text-xl text-secondary-muted"
        onClick={handleClose}
      >
        <FaArrowLeft />
      </i>
    </div>
  );
}

export default SearchBar;
