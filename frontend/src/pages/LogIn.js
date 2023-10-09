import React, { useEffect } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { FaSignInAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userSignInAction } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useSelector((state) => state.signIn);
  useEffect(() => {
    console.log("userInfo", userInfo);
    if (isAuthenticated) {
      if (userInfo.role === 1) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(userSignInAction(values));
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
            <h1 className="text-blue-600 text-2xl">Login</h1>
            <div className="m-1 bg-blue-600 p-2 rounded-full w-10 h-10">
              <FaSignInAlt className="text-white" />
            </div>
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
            Log In
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LogIn;
