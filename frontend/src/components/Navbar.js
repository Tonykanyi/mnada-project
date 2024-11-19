import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Navbar = ({ userRole, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-white text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Mnada Auctioneers
        </h1>

        <div className="flex items-center space-x-6">
          {/* Home Link */}
          <Link
            to="/"
            className="text-white hover:text-blue-300 transition text-lg"
          >
            Home
          </Link>

          {/* About Us Link */}
          <Link
            to="/about-us"
            className="text-white hover:text-blue-300 transition text-lg"
          >
            About Us
          </Link>

          {/* Login/Register or Logout button */}
          {!userRole ? (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center text-white bg-blue-600 px-3 py-2 rounded-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <FaSignInAlt className="mr-2" />
              Log In / Register
            </button>
          ) : (
            <button
              onClick={handleLogoutClick}
              className="flex items-center text-white bg-red-600 px-3 py-2 rounded-md hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
