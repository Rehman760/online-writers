import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJobTypeAction } from "../../redux/actions/jobTypeAction";

const DashCreateCategory = () => {
  const { user } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const jobTypeName = event.target.jobTypeName.value;
    const values = {
      user: user && user._id,
      jobTypeName,
    };
    dispatch(createJobTypeAction(values));
    event.target.reset();
  };

  return (
    <div className="h-screen flex items-center justify-center pt-4">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 bg-white rounded p-4"
      >
        <div className="text-center ">
          <h1 className="text-3xl text-blue-600 font-bold pb-3">
            Create a Category
          </h1>
        </div>
        <div className="mb-3">
          <label
            htmlFor="jobTypeName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category
          </label>
          <input
            type="text"
            id="jobTypeName"
            name="jobTypeName"
            placeholder="Category name"
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create category
        </button>
      </form>
    </div>
  );
};

export default DashCreateCategory;
