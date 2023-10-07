import React from "react";

const StatComponent = ({ value, icon, description, money }) => {
  return (
    <div className="bg-blue-600 w-full">
      <div className="bg-primary p-4">{icon}</div>
      <div className="p-4">
        <h4 className="text-white text-2xl font-semibold mb-1">
          {money !== "" ? money + value : value}
        </h4>
        <p className="text-primary">{description}</p>
      </div>
    </div>
  );
};

export default StatComponent;
