import React from "react";

interface ProductProps {
  image: string;
  name: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  link: string;
}

const Product: React.FC<ProductProps> = ({
  image,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  link,
}) => {
  return (
    <div className="px-4 py-6 bg-white shadow rounded overflow-hidden group">
      <div className="relative">
        <img src={image} alt={name} className="w-full" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
          <a
            href={link}
            className="bg-primary text-white text-lg rounded-full w-9 h-8 flex items-center justify-center hover:bg-gray-800 transition"
          >
            <i className="fas fa-search"></i>
          </a>
          <a
            href={link}
            className="bg-primary text-white text-lg rounded-full w-9 h-8 flex items-center justify-center hover:bg-gray-800 transition"
          >
            <i className="far fa-heart"></i>
          </a>
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <a href={link}>
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
            {name}
          </h4>
        </a>
        <div className="flex items-baseline mb-1 space-x-2 font-roboto">
          <p className="text-xl text-primary font-semibold">{price}</p>
          <p className="text-sm text-gray-400 line-through">{originalPrice}</p>
        </div>
        <div className="flex items-center">
          <div className="text-yellow-400 flex gap-1 text-sm">
            {Array.from({ length: rating }, (_, i) => (
              <i key={i} className="fas fa-star"></i>
            ))}
          </div>
          <div className="text-xs text-gray-500 ml-3">({reviews})</div>
        </div>
      </div>
      <a
        href={link}
        className="bg-primary border border-primary rounded-b text-white w-full block py-1 hover:bg-transparent hover:text-primary transition text-center"
      >
        Add to cart
      </a>
    </div>
  );
};

export default Product;
