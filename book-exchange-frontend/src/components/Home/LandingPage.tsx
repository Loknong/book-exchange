import React from "react";
import Banner from "./Banner";
import Feature from "./Feature";
import Category from "./Category";
import BookCard from "../BookExplore/BookCard";

import { features, category, books } from "../../utils/mock/LandingPageMock";

const LandingPage: React.FC = () => {
  return (
    <>
      <Banner
        title="Discover Your Next Great Read"
        description="Exchange your books with ease and explore a vast collection of titles. Join the Turnix community and share your love for reading."
        backgroundImage="images/banner-bg.jpg" // Replace with your actual image path
        buttonText="Explore Now"
        buttonLink="/explore"
      />

      <div className="container py-10 md:py-16">
        <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      <div className="container py-10 md:py-16">
        <h2 className="text-3xl font-medium text-gray-800 uppercase mb-6">
          Browse by Genre
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-3">
          {category.map((category, index) => (
            <Category
              key={index}
              image={category.image}
              title={category.title}
              link={category.link}
            />
          ))}
        </div>
      </div>

      <div className="container md:pb-16 pb-6">
        <h2 className="md:text-2xl text-xl font-medium text-gray-800 uppercase md:mb-6 mb-2">
          New Arrivals
        </h2>
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <BookCard
              image={book.image}
              title={book.title}
              author={book.author}
              condition={book.condition}
              views={book.views}
              link={book.link}
              key={index}
            />
          ))}
        </div> */}
        <div className="flex md:space-x-6 space-x-2 overflow-x-auto py-2 md:py-4">
          {books.map((book, index) => (
            <div key={index} className="flex-none w-40 md:w-60">
              <BookCard
                image={book.image}
                title={book.title}
                author={book.author}
                condition={book.condition}
                views={book.views}
                link={book.link}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
