import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow my-20 py-20">
      <FaExclamationTriangle className="text-6xl text-primary mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-8">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <button
        onClick={goHome}
        className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;
