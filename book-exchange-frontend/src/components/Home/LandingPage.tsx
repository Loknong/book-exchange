import React from "react";
import Banner from "./Banner";
import Feature from "./Feature";
import Category from "./Category";
import Product from "./Product";

const LandingPage: React.FC = () => {
  return (
    <>
      <Banner
        title="Best Collection for Home Decoration"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur alias similique a nobis et voluptates corporis quis quam,"
        backgroundImage=""
        buttonText="Shop Now"
        buttonLink="#"
      />

      <div className="container py-16">
        <div className="w-10/12 mx-auto grid grid-cols-3 gap-6 justify-center">
          <Feature
            icon="images/icons/delivery-van.svg"
            title="Free Delivery"
            description="order over $200"
          />
          <Feature
            icon="images/icons/money-back.svg"
            title="Money Return"
            description="30 Days money return"
          />
          <Feature
            icon="images/icons/service-hours.svg"
            title="24/7 Support"
            description="Customer support"
          />
        </div>
      </div>

      <div className="container py-16">
        <h2 className="text-3xl font-medium text-gray-800 uppercase mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <Category
            image="images/category/category-1.jpg"
            title="Bedroom"
            link="#"
          />
          <Category
            image="images/category/category-2.jpg"
            title="Sofa"
            link="#"
          />
          <Category
            image="images/category/category-3.jpg"
            title="Office"
            link="#"
          />
          <Category
            image="images/category/category-4.jpg"
            title="Outdoor"
            link="#"
          />
          <Category
            image="images/category/category-5.jpg"
            title="Mattress"
            link="#"
          />
          <Category
            image="images/category/category-6.jpg"
            title="Dining"
            link="#"
          />
        </div>
      </div>

      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          Top New Arrival
        </h2>
        <div className="grid grid-cols-4 gap-6">
          <Product
            image="images/products/product9.jpg"
            name="Guyer Chair"
            price="$45.00"
            originalPrice="$65.00"
            rating={5}
            reviews={150}
            link="#"
          />
          {/* Repeat <Product /> component for other products */}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
