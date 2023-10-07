import React from "react";

const LoadingBox = () => {
  return (
    <>
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="w-16 h-16 border-t-2 border-primary rounded-full border-r-2 border-transparent animate-spin"></div>
      </div>
    </>
  );
};

export default LoadingBox;
