import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { jobTypeLoadAction } from "../../redux/actions/jobTypeAction";
import { registerAjobAction } from "../../redux/actions/jobAction";
import * as yup from "yup";
const DashCreateJob = () => {
  const dispatch = useDispatch();
  const [jobType, setJobType] = useState([]);
  const { jobTypeAll } = useSelector((state) => state);
  const { jobType: jobTypeList } = jobTypeAll;

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, [dispatch]);

  useEffect(() => {
    if (jobTypeList) {
      setJobType(jobTypeList);
    }
  }, [jobTypeList]);

  const validationSchema = yup.object({
    title: yup.string("Enter a job title").required("Title is required"),
    description: yup
      .string("Enter a description")
      .min(6, "Description should be at least 6 characters")
      .required("Description is required"),
    salary: yup.number("Enter a salary").required("Salary is required"),
    location: yup.string("Enter a location").required("Location is required"),
    jobType: yup.string("Select a Category").required("Category is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      salary: "",
      location: "",
      jobType: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(registerAjobAction(values));
      actions.resetForm();
    },
  });

  return (
    <div className="h-screen flex items-center justify-center pt-4">
      <form
        onSubmit={formik.handleSubmit}
        className="border border-gray-300 p-4 bg-white rounded"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold pb-3">Register a Job</h1>
        </div>
        <div className="mb-3">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            className={`border rounded w-full py-2 px-3 ${
              formik.errors.title ? "border-red-500" : ""
            }`}
            required
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            className={`border rounded w-full py-2 px-3 ${
              formik.errors.description ? "border-red-500" : ""
            }`}
            required
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="salary"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Salary
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            placeholder="Salary"
            className={`border rounded w-full py-2 px-3 ${
              formik.errors.salary ? "border-red-500" : ""
            }`}
            required
            value={formik.values.salary}
            onChange={formik.handleChange}
          />
          {formik.touched.salary && formik.errors.salary && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.salary}</p>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="location"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            className={`border rounded w-full py-2 px-3 ${
              formik.errors.location ? "border-red-500" : ""
            }`}
            required
            value={formik.values.location}
            onChange={formik.handleChange}
          />
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.location}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="jobType"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category
          </label>
          <select
            id="jobType"
            name="jobType"
            className={`border rounded w-full py-2 px-3 ${
              formik.errors.jobType ? "border-red-500" : ""
            }`}
            required
            value={formik.values.jobType}
            onChange={formik.handleChange}
          >
            <option value="" key=""></option>
            {jobType.map((category) => (
              <option value={category._id} key={category._id}>
                {category.jobTypeName}
              </option>
            ))}
          </select>
          {formik.touched.jobType && formik.errors.jobType && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.jobType}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create job
        </button>
      </form>
    </div>
  );
};

export default DashCreateJob;
