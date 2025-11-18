import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation(); // current path

  // check if it's a dashboard path
  const isDashboard =
    location.pathname.startsWith("/creator") ||
    location.pathname.startsWith("/admin");

  // decide where "Go Home" button goes
  const homeTarget = isDashboard
    ? location.pathname.startsWith("/creator")
      ? "/creator/dashboard"
      : "/admin/dashboard"
    : "/";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl w-full">
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-blue-600 mb-4">404</h1>

        <div className="flex justify-center mb-6 sm:mb-8" aria-hidden="true">
          {/* svg */}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          {isDashboard ? "Dashboard page not found" : "Page Not Found"}
        </h2>

        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">
          Sorry, we couldn't find the page you're looking for.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto px-4">
          <Link
            to={homeTarget}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            {isDashboard ? "Go to Dashboard" : "Go Home"}
          </Link>

          <Link
            to="/campaigns"
            className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 w-full sm:w-auto"
          >
            Browse Campaigns
          </Link>
        </div>
      </div>
    </div>
  );
}