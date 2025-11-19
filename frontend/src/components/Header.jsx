import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, HeartIcon, UserIcon } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const userRole = user?.role;
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section: Logo + Navigation links */}
          <div className="flex items-center">
            {/* Brand Logo */}
            <Link to="/" className="shrink-0 flex items-center">
              <HeartIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-blue-600">
                Aidly
              </span>
            </Link>

            {/* Desktop navigation links (hidden on small screens) */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/campaigns"
                className="border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Campaigns
              </Link>
            </div>
          </div>
          {/* Right section: Auth buttons or user dashboard links */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center">
                {/* Conditional admin dashboard link */}
                {userRole === "admin" && (
                  <Link
                    to="/admin/home"
                    className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {userRole === "creator" && (
                  <Link
                    to="/creator/home"
                    className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Creator Dashboard
                  </Link>
                )}
              </div>
            ) : (
              // When user is NOT logged in
              <div>
                <Link
                  to="/signin"
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
          {/* Mobile menu toggle button (visible only on small screens) */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu (shown when isMenuOpen is true) */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-gray-500 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/campaigns"
              className="text-gray-500 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Campaigns
            </Link>

            {!isAuthenticated && (
              <>
                <Link
                  to="/auth"
                  className="text-gray-500 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Log in
                </Link>
                <Link
                  to="/auth"
                  className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign up
                </Link>
              </>
            )}
            {userRole === "admin" && (
              <Link
                to="/admin/home"
                className="text-blue-700 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Admin Dashboard
              </Link>
            )}
            {userRole === "creator" && (
              <Link
                to="/creator/home"
                className="text-blue-700 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Creator Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Header;
