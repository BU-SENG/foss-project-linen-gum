import React from "react";
import { Link, useLocation } from "react-router-dom";

function NotFound() {
   const location = useLocation();
   const isDashboard = location.pathname.startsWith("/creator") || location.pathname.startsWith("/admin");
  return (
    <div>
      <h1 className="text-lg text-blue-700 mt-2">
        {isDashboard ? "Dashboard page not found" : "Page not found"}
      </h1>
      <Link
        to={isDashboard ? "/dashboard" : "/"}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {isDashboard ? "Go to Dashboard" : "Go Home"}
      </Link>
    </div>
  );
}

export default NotFound;
