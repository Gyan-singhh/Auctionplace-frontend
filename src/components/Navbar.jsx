import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardBtn from "./DashboardBtn.jsx";

const Navbar = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                className="h-10 w-auto"
                src={"/logo.png"}
                alt="Company Logo"
              />
              <span className="ml-2 text-xl font-bold text-[#2E8B57] hidden sm:block">
                TheAuctionPlace
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-[#378870] transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="text-gray-600 hover:text-[#378870] transition-colors font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-[#378870] transition-colors font-medium"
            >
              Contact
            </Link>

            {!authStatus ? (
              <div className="flex items-center space-x-4 ml-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-[#378870] transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-[#2E8B57] text-white rounded-lg hover:bg-[#2a6b5a] transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="ml-4">
                <Link to="/user">
                  <DashboardBtn />
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#378870] focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              onClick={() => setIsOpen(false)}
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#378870] hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              to="/about-us"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#378870] hover:bg-gray-50"
            >
              About
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#378870] hover:bg-gray-50"
            >
              Contact
            </Link>

            {!authStatus ? (
              <div className="pt-4 pb-2 border-t border-gray-200">
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/login"
                  className="block w-full px-4 py-2 text-center rounded-md text-base font-medium text-[#2E8B57] hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/signup"
                  className="mt-2 block w-full px-4 py-2 text-center rounded-md text-base font-medium bg-[#2E8B57] text-white hover:bg-[#2a6b5a]"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <Link
                onClick={() => setIsOpen(false)}
                to="/user"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#378870] hover:bg-gray-50"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
