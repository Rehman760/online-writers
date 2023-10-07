import React, { useEffect } from "react";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useFormik } from "formik";
import { FaSignLanguage } from "react-icons/fa";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { userSignUpAction } from "../redux/actions/userAction";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your First Name")
    .min(3, "First Name should be of minimum 3 characters length")
    .required("First Name is required"),
  lastName: yup
    .string("Enter your Last Name")
    .min(3, "Last Name should be of minimum 3 characters length")
    .required("Last Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      //alert(JSON.stringify(values, null, 2));
      dispatch(userSignUpAction(values))
        .then((response) => {
          if (actions.resetForm.length === 1) {
            // Registration was successful, navigate to the login page
            navigate("/login");
          } else {
            console.error("Registration failed");
          }
        })
        .catch((error) => {
          console.error("Registration failed", error);
        });

      console.log("Action:", actions);
      localStorage.getItem("userInfo", JSON.stringify(values));
      actions.resetForm();
    },
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white rounded p-4 border max-w-md w-full"
        >
          <div className="text-center mb-3 flex justify-center">
            <h1 className="text-blue-600 text-2xl">SignUp</h1>
            <div className="m-1 bg-blue-600 p-2 rounded-full w-10 h-10">
              <FaSignLanguage className="text-white" />
            </div>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500">{formik.errors.lastName}</div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Register
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
