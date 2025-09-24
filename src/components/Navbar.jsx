import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsDarkMode, toggleTheme } from "../store/themeSlice";

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const isDarkMode = useSelector(selectIsDarkMode);
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg border-b-4 border-purple-500 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 text-xl font-bold bg-clip-text text-transparent">
              My Notes
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === "/"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-md text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            {user && (
              <button 
                onClick={onLogout} 
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;