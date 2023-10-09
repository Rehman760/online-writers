import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userProfileAction,
  userLogoutAction,
} from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaUsers,
  FaBriefcase,
  FaComment,
  FaObjectGroup,
  FaUserFriends,
  FaArrowLeft,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import logoDashboard from "../../images/hr-project.png";

const SidebarAdm = () => {
  const { userInfo } = useSelector((state) => state.signIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    dispatch(userProfileAction());
  }, []);

  const logOut = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div
      className={`w-${
        collapsed ? "16" : "60"
      } bg-blue-600 border-r text-white transition-width duration-300 `}
    >
      <div className="text-xl cursor-pointer p-4" onClick={toggleSidebar}>
        <FiMenu />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <div className="pt-3 pb-5 flex justify-center">
            <img
              src={logoDashboard}
              alt="Logo"
              className={`h-16 transform transition-transform duration-500 ${
                collapsed ? "hover:scale-105" : ""
              }`}
            />
          </div>
          <ul className="text-lg">
            <li>
              <Link
                to={
                  userInfo && userInfo.role === 1
                    ? "/admin/dashboard"
                    : "/user/dashboard"
                }
                className="flex items-center p-4 hover:bg-blue-700"
              >
                {collapsed ? (
                  <FaHome />
                ) : (
                  <>
                    <FaHome /> {"Dashboard"}
                  </>
                )}
              </Link>
            </li>
            <li>
              <Link
                to={
                  userInfo && userInfo.role === 1
                    ? "/admin/users"
                    : "/user/jobs"
                }
                className="flex items-center p-4 hover:bg-blue-700"
              >
                {collapsed ? (
                  <FaUsers />
                ) : (
                  <>
                    <FaUser />{" "}
                    {userInfo && userInfo.role === 1
                      ? "All users"
                      : "Applied Jobs"}
                  </>
                )}
              </Link>
            </li>
            <li>
              <Link
                to={
                  userInfo && userInfo.role === 1 ? "/admin/jobs" : "/user/info"
                }
                className="flex items-center p-4 hover:bg-blue-700"
              >
                {collapsed ? (
                  <FaBriefcase />
                ) : (
                  <>
                    <FaBriefcase />
                    {userInfo && userInfo.role === 1 ? "Jobs" : "Personal Info"}
                  </>
                )}
              </Link>
            </li>
            <li>
              <Link
                to={
                  userInfo && userInfo.role === 1
                    ? "/admin/chats"
                    : "/user/chats"
                }
                className="flex items-center p-4 hover:bg-blue-700"
                onClick={() => setCollapsed(true)} // Add this onClick handler
              >
                {collapsed ? (
                  <FaComment />
                ) : (
                  <>
                    <FaComment />{" "}
                    {userInfo && userInfo.role === 1
                      ? "Chats"
                      : "Chat with Admin"}
                  </>
                )}
              </Link>
            </li>

            {userInfo && userInfo.role === 1 && (
              <li>
                <Link
                  to="/admin/category"
                  className="flex items-center p-4 hover:bg-blue-700"
                >
                  {collapsed ? (
                    <FaObjectGroup />
                  ) : (
                    <>
                      <FaObjectGroup />
                      Category
                    </>
                  )}
                </Link>
              </li>
            )}
            <li>
              <div
                onClick={() => navigate("/")}
                className="flex items-center p-4 hover:bg-blue-700"
              >
                {collapsed ? (
                  <FaArrowLeft />
                ) : (
                  <>
                    {" "}
                    <FaArrowLeft />
                    {"Go to Home"}
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className="pb-2 pt-2">
          <ul>
            <li>
              <div
                onClick={logOut}
                className="flex items-center p-4 hover:bg-blue-700"
              >
                {collapsed ? (
                  <FaSignOutAlt />
                ) : (
                  <>
                    {" "}
                    <FaSignOutAlt />
                    {"Log Out"}
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdm;
