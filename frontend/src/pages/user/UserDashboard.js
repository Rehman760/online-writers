import React from "react";
import { useSelector } from "react-redux";
import StatComponent from "../../component/StatComponent";
import { FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import moment from "moment";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.userProfile);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-white pb-3">Dashboard</h1>
      <div className="space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
        <StatComponent
          value={user && moment(user.createdAt).format("YYYY / MM / DD")}
          icon={<FaCalendarAlt className="text-white text-3xl" />}
          description="Member since"
          money=""
        />
        <StatComponent
          value={user && user.jobsHistory.length}
          icon={<FaBriefcase className="text-white text-3xl" />}
          description="Number of jobs submitted"
          money=""
        />
      </div>
    </div>
  );
};

export default UserDashboard;
