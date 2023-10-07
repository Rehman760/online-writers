import React from "react";
import { useSelector } from "react-redux";
import { FaUser, FaEnvelope } from "react-icons/fa";

const UserInfoDashboard = () => {
  const { user } = useSelector((state) => state.userProfile);

  return (
    <div className="max-w-1/2 mx-auto pt-10">
      <div className="bg-blue-400">
        <div className="px-6 py-4">
          <p className="text-2xl font-semibold text-white">Personal Info</p>
          <hr className="my-6" />
          <p className="text-lg text-white">
            First name: {user && user.firstName}
          </p>
          <p className="text-lg text-white">
            Last name: {user && user.lastName}
          </p>
          <p className="text-lg text-white">
            <FaEnvelope className="inline text-white mr-2" />
            E-mail: {user && user.email}
          </p>
          <p className="text-gray-500 pt-8">
            <FaUser className="inline text-white mr-2" />
            Status: {user && user.role === 0 ? "Regular user" : "Admin"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoDashboard;
