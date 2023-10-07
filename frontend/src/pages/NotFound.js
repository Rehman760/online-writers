import React from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white">
        <h1 className="text-3xl font-semibold">Page not found!</h1>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
