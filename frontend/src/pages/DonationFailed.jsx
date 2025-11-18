import React from "react";

function DonationFailed() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100">
            <span className="text-red-600 text-4xl">✖</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Donation Failed
        </h1>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! Something went wrong while processing your donation.
          Please check your internet connection or payment details, and try again.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition">
            Try Again
          </button>

          <button className="border border-red-500 text-red-600 px-6 py-3 rounded-md font-medium hover:bg-red-50 transition">
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonationFailed;
