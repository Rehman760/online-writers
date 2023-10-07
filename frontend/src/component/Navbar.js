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

          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-white">
              Home
            </Link>
            <Link to="/register" className="text-white">
              Register
            </Link>
          </div>

          {userInfo ? (
            <button
              onClick={handleOpenNavMenu}
              className="text-white cursor-pointer"
            >
              Menu
            </button>
          ) : (
            <Link to="/login" className="text-white">
              Log In
            </Link>
          )}
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
