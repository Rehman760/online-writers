import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../redux/actions/userAction";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.signIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(userLogoutAction());
    setTimeout(() => {
      navigate("/");
      window.location.reload(true);
    }, 500);
  };

  const handleOpenUserMenu = (event) => {
    // Implement your user menu logic here
  };

  const handleOpenNavMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseNavMenu = () => {
    setMenuOpen(false);
  };

  const handleCloseUserMenu = () => {
    // Implement user menu close logic here
  };

  return (
    <nav className="bg-blue-600">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-white text-xl font-bold hidden md:block"
            >
              JOB PORTAL
            </Link>
          </div>

          <div>
            {!userInfo && (
              <Link
                to="/register"
                className="bg-white text-blue-500 px-8 cursor-pointer rounded"
              >
                Register
              </Link>
            )}

            {userInfo ? (
              <button
                onClick={handleOpenNavMenu}
                className="text-blue-500 bg-white px-8 m-2 cursor-pointer rounded"
              >
                visit
              </button>
            ) : (
              <Link
                to="/login"
                className="text-blue-500 bg-white rounded m-2 cursor-pointer px-8 "
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-blue-600 py-2 px-4 absolute  right-2">
          <Link to="/user/dashboard" className="block text-white mb-2">
            User Dashboard
          </Link>
          {userInfo ? (
            <button onClick={handleLogout} className="text-white">
              Log Out
            </button>
          ) : (
            <Link to="/login" className="block text-white">
              Log In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
