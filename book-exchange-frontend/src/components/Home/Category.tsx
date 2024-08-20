import React from "react";

interface CategoryProps {
  image: string;
  title: string;
  link: string;
}

const Category: React.FC<CategoryProps> = ({ image, title, link }) => {
  return (
    <div className="relative group rounded-sm overflow-hidden">
      <img src={image} alt={title} className="w-full" />
      <a
        href={link}
        className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 text-white font-medium group-hover:bg-opacity-50 transition"
      >
        {title}
      </a>
    </div>
  );
};

export default Category;
