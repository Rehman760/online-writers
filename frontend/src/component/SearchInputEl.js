import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  search: yup.string().required("This field cannot be empty"),
});

const SearchInputEl = () => {
  const navigate = useNavigate();

  const onSubmit = (values, actions) => {
    const { search } = values;
    if (search.trim()) {
      navigate(`/search/${search}`);
    } else {
      navigate("/");
    }
    actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <div className="w-full flex justify-center items-center">
        <input
          type="text"
          className="bg-white p-2 w-full border border-gray-300 rounded"
          id="search"
          name="search"
          placeholder="ex: developer, front end"
          value={values.search}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
          disabled={isSubmitting}
        >
          Search
        </button>
      </div>
      {touched.search && errors.search && (
        <div className="text-orange-500">{errors.search}</div>
      )}
    </form>
  );
};

export default SearchInputEl;
