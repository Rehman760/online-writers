import React from "react";
import { Link } from "react-router-dom";

const CardElement = ({ jobTitle, description, category, location, id }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 mb-6 rounded-md bg-white shadow-md">
      <div className="text-xl font-semibold text-secondary flex items-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-secondary mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        {location}
      </div>
      <h2 className="text-2xl font-bold">{jobTitle}</h2>
      <p className="text-secondary mb-2">{category}</p>
      <p className="text-sm">
        Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
      </p>
      <div className="mt-4">
        <Link
          to={`/job/${id}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-secondary-dark transition duration-300"
        >
          More Details
        </Link>
      </div>
    </div>
  );
};

export default CardElement;
