import React from "react";
import Banner from "./Banner";
import Feature from "./Feature";
import Category from "./Category";
import IconFastExchange from "../../assets/images/icons/delivery-van.svg";
import IconTrustWorthy from "../../assets/images/icons/money-back.svg";
import IconServiceHours from "../../assets/images/icons/service-hours.svg";
import BookCard from "../BookExplore/BookCard";
import ProductImg from "../../assets/images/products/product1.jpg";

const LandingPage: React.FC = () => {
  return (
    <>
      <Banner
        title="Discover Your Next Great Read"
        description="Exchange your books with ease and explore a vast collection of titles. Join the Turnix community and share your love for reading."
        backgroundImage="images/banner-bg.jpg" // Replace with your actual image path
        buttonText="Explore Now"
        buttonLink="#"
      />

      <div className="container py-16">
        <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          <Feature
            icon={IconFastExchange} // Replace with your actual icon path
            title="Fast Exchange"
            description="Swap books with members in your area."
          />
          <Feature
            icon={IconTrustWorthy} // Replace with your actual icon path
            title="Trustworthy Community"
            description="Safe and reliable book exchanges."
          />
          <Feature
            icon={IconServiceHours} // Replace with your actual icon path
            title="24/7 Support"
            description="We're here to help whenever you need it."
          />
        </div>
      </div>

      <div className="container py-16">
        <h2 className="text-3xl font-medium text-gray-800 uppercase mb-6">
          Browse by Genre
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-3">
          <Category
            image={ProductImg} // Replace with your actual image path
            title="Fiction"
            link="#"
          />
          <Category
            image={ProductImg} // Replace with your actual image path
            title="Non-Fiction"
            link="#"
          />
          <Category
            image={ProductImg} // Replace with your actual image path
            title="Mystery"
            link="#"
          />
          <Category
            image={ProductImg} // Replace with your actual image path
            title="Science Fiction"
            link="#"
          />
          <Category
            image={ProductImg} // Replace with your actual image path
            title="Romance"
            link="#"
          />
          <Category
            image={ProductImg} // Replace with your actual image path
            title="Young Adult"
            link="#"
          />
        </div>
      </div>

      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          New Arrivals
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <BookCard
            image={ProductImg}
            title="The Great Gatsby"
            author="F. Scott Fitzgerald"
            condition="New"
            views={150}
            link="product/1"
          />
          <BookCard
            image={ProductImg}
            title="The Great Gatsby"
            author="F. Scott Fitzgerald"
            condition="New"
            views={150}
            link="product/1"
          />{" "}
          <BookCard
            image={ProductImg}
            title="The Great Gatsby"
            author="F. Scott Fitzgerald"
            condition="New"
            views={150}
            link="product/1"
          />{" "}
          <BookCard
            image={ProductImg}
            title="The Great Gatsby"
            author="F. Scott Fitzgerald"
            condition="New"
            views={150}
            link="product/1"
          />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
