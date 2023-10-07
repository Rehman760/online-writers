import React from "react";
import { useSelector } from "react-redux";

const SelectComponent = ({ handleChangeCategory, cat }) => {
  const { jobType } = useSelector((state) => state.jobTypeAll);

  return (
    <div className="w-48">
      <label htmlFor="category" className="block text-gray-700">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={cat}
        onChange={handleChangeCategory}
        className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      >
        <option value="">All</option>
        {jobType &&
          jobType.map((jt) => (
            <option key={jt._id} value={jt._id}>
              {jt.jobTypeName}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectComponent;
