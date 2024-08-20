import React from "react";
import banner from "../../assets/images/banner-bg.jpg"
interface BannerProps {
  title: string;
  description: string;
  backgroundImage: string;
  buttonText: string;
  buttonLink: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  description,
  backgroundImage,
  buttonText,
  buttonLink,
}) => {
  return (
    <div
      className="bg-cover py-36 bg-center bg-no-repeat"
      style={{ backgroundImage:  `url(${banner})` }}
    >
      <div className="container">
        <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
          {title}
        </h1>
        <p>{description}</p>
        <div className="mt-12">
          <a
            href={buttonLink}
            className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary transition"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
