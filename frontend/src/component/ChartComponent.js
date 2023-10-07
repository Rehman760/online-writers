import React from "react";

const ChartComponent = ({ children }) => {
  return (
    <>
      <div className="bg-midNightBlue w-full">
        <div className="w-full max-w-full p-4 mx-auto">{children}</div>
      </div>
    </>
  );
};

export default ChartComponent;
