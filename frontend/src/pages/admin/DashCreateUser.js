import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DashCreateUser = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    jobshistory: "",
    role: "",
  };

  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "First Name should be at least 3 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(3, "Last Name should be at least 3 characters")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .required("Password is required"),
    jobshistory: Yup.string(),
    role: Yup.string(),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post("/api/create/user", values);
      console.log("User created successfully", response.data);
      actions.resetForm();
      toast.success("User created successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error creating user", error);
      toast.fail("Failed to create user", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="mx-auto max-w-md p-4 bg-white rounded shadow w-64">
      <h2 className="text-2xl font-bold mb-4">Create a New User</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4 flex flex-wrap -mx-2">
            <div className="w-1/2 px-2">
              <label
                htmlFor="firstName"
                className="block text-gray-600 font-semibold"
              >
                First Name
              </label>
              <Field
                type="text"
                name="firstName"
                id="firstName"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-1/2 px-2">
              <label
                htmlFor="lastName"
                className="block text-gray-600 font-semibold"
              >
                Last Name
              </label>
              <Field
                type="text"
                name="lastName"
                id="lastName"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-semibold"
            >
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 border rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-semibold"
            >
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 border rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="jobshistory"
              className="block text-gray-600 font-semibold"
            >
              Jobs History
            </label>
            <Field
              type="text"
              name="jobshistory"
              id="jobshistory"
              className="w-full px-3 py-2 border rounded"
            />
            <ErrorMessage
              name="jobshistory"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-600 font-semibold">
              Role
            </label>
            <Field
              type="text"
              name="role"
              id="role"
              className="w-full px-3 py-2 border rounded"
            />
            <ErrorMessage
              name="role"
              component="div"
              className="text-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Create
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default DashCreateUser;
