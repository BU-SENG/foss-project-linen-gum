import React from "react";
import {
  XMarkIcon,
  ArrowPathIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

function DonationFailed() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      {/* ICON SECTION */}
      <div className="flex items-center justify-center mb-4">
        {/* Outer Circle */}
        <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-red-300">
          {/* Inner Circle */}
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-100">
            <XMarkIcon className="w-12 h-12 text-red-600" />
          </div>
        </div>
      </div>

      {/* TITLE */}
      <h1 className="text-4xl font-extrabold text-red-600 mb-3 tracking-tight">
        Donation Failed
      </h1>

      {/* DESCRIPTION */}
      <p className="text-gray-600 mb-8 max-w-md mx-auto text-base leading-relaxed">
        Oops! Something went wrong while processing your donation. Please check
        your internet connection or payment details, and try again.
      </p>

      {/* BUTTONS */}
      <div className="flex items-center justify-center gap-4">
        {/* TRY AGAIN BUTTON */}
        <button className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition flex items-center gap-2">
          <ArrowPathIcon className="w-5 h-5" />
          Try Again
        </button>

        {/* GO HOME BUTTON */}
        <button className="border border-red-500 text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition flex items-center gap-2">
          <HomeIcon className="w-5 h-5" />
          Go Home
        </button>
      </div>
    </div>
  );
}

export default DonationFailed;
