import React from "react";
import { useDispatch, useSelector } from "react-redux";

const HeaderTop = () => {
  return (
    <div className="flex justify-end items-end bg-blue-600 p-4">
      <div className="hidden sm:block">
        <div className="relative text-white focus-within:text-gray-600">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            className="block w-64 h-10 pl-10 pr-3 text-gray-700  rounded-full focus:outline-none"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
