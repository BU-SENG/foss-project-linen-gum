import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation(); // current path

  // check if it's dashboard route
  const isDashboard =
    location.pathname.startsWith("/creator") ||
    location.pathname.startsWith("/admin");

  // decide home target
  const homeTarget = isDashboard
    ? location.pathname.startsWith("/creator")
      ? "/creator/dashboard"
      : "/admin/dashboard"
    : "/";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl w-full">

        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-blue-600 mb-4">
          404
        </h1>

        {/* Search icon under 404 */}
        <div className="flex justify-center mb-6 sm:mb-8" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="55"
            height="55"
            stroke="grey"
            fill="none"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="10" cy="10" r="6" />
            <path d="M22 22l-6-6" />
          </svg>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          {isDashboard ? "Dashboard page not found" : "Page Not Found"}
        </h2>

        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto px-4">
          {/* Go Home / Dashboard */}
          <Link
            to={homeTarget}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            {/* home icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M3 9.5L12 3l9 6.5v10.5a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5z" />
            </svg>

            {isDashboard ? "Go to Dashboard" : "Go Home"}
          </Link>

          {/* Browse Campaigns */}
          <Link
            to="/campaigns"
            className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer w-full sm:w-auto"
          >
            {/* search icon on button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
              className="inline-block mr-2"
            >
              <circle cx="10" cy="10" r="6" />
              <path d="M22 22l-6-6" />
            </svg>

            Browse Campaigns
          </Link>
        </div>
      </div>
    </div>
  );
}