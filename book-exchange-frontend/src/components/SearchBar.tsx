import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className=" relative flex">
      <span className="absolute md:left-4 top-2 md:top-4 right-4 text-lg text-primary md:text-gray-400">
        <FaSearch />
      </span>
      <input
        type="text"
        className="w-full border border-primary pl-2 md:pl-12 py-1 md:py-3 rounded-r-md px-36 md:rounded-r-none rounded-l-md focus:outline-none"
        placeholder="Search for books"
      />
      <button className="hidden md:block bg-primary border border-primary text-white rounded-r-md hover:bg-transparent px-8 md:px-4 hover:text-primary hover:border-l-0 transition">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
