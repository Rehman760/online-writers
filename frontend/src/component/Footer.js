import React from "react";

const Footer = () => {
  return (
    <>
      <div className="h-16 bg-blue-600 flex items-center justify-center">
        <span className="text-primary">{`All rights reserved! ${new Date().getFullYear()}.`}</span>
      </div>
    </>
  );
};

export default Footer;
