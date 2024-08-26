import React from "react";
import SidebarFilter from "./SideBarFilter";
import BookCard from "./BookCard";
import ProductImg from "../../assets/images/products/product1.jpg";
import { TfiMenuAlt } from "react-icons/tfi";
import { CgMenuGridO } from "react-icons/cg";

const BookExplorePage: React.FC = () => {
  const books = [
    {
      image: ProductImg,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      condition: "New",
      views: 150,
      link: "product/1",
    },
    {
      image: ProductImg,
      title: "1984",
      author: "George Orwell",
      condition: "Used - Like New",
      views: 300,
      link: "product/2",
    },
    {
      image: ProductImg,
      title: "1984",
      author: "George Orwell",
      condition: "Used - Like New",
      views: 300,
      link: "product/2",
    },
    {
      image: ProductImg,
      title: "1984",
      author: "George Orwell",
      condition: "Used - Like New",
      views: 300,
      link: "product/2",
    },
  ];

  const sidebarFilters = [
    {
      title: "Genres",
      options: [
        { id: "genre-1", label: "Science Fiction", count: 15 },
        { id: "genre-2", label: "Mystery", count: 12 },
        { id: "genre-3", label: "Biography", count: 8 },
        { id: "genre-4", label: "Romance", count: 20 },
      ],
    },
    {
      title: "Condition",
      options: [
        { id: "condition-1", label: "New", count: 10 },
        { id: "condition-2", label: "Used - Like New", count: 8 },
        { id: "condition-3", label: "Used - Good", count: 12 },
        { id: "condition-4", label: "Used - Acceptable", count: 5 },
      ],
    },
    {
      title: "Language",
      options: [
        { id: "language-1", label: "English", count: 25 },
        { id: "language-2", label: "Spanish", count: 10 },
        { id: "language-3", label: "French", count: 7 },
        { id: "language-4", label: "German", count: 3 },
      ],
    },
  ];

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
            />
          ))}
        </div>
      </div>

      {/* Book List */}
      <div className="lg:col-span-3 col-span-4">
        {/* Sorting */}
        <div className="flex items-center mb-4">
          <select className="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
            <option value="default">Default</option>
            <option value="views">Most Viewed</option>
            <option value="condition">Best Condition</option>
            <option value="recent">Recently Added</option>
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
          {books.map((book, index) => (
            <BookCard
              key={index}
              image={book.image}
              title={book.title}
              author={book.author}
              condition={book.condition}
              views={book.views}
              link={book.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookExplorePage;
