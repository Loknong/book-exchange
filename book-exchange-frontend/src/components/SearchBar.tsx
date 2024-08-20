import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="w-full max-w-xl relative flex">
      <span className="absolute left-4 top-4 text-lg text-gray-400">
        <FaSearch />
      </span>
      <input
        type="text"
        className="w-full border border-primary pl-12 py-3 rounded-l-md focus:outline-none"
        placeholder="Search for books"
      />
      <button className="bg-primary border border-primary text-white rounded-r-md hover:bg-transparent px-8 hover:text-primary hover:border-l-0 transition">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
