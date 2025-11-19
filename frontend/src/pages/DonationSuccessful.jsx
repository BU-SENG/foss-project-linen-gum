import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Home, List } from "lucide-react"; // Lucide icons

const DonationSuccess = () => {
  const navigate = useNavigate();

  // Hard-coded values
  const title = "Save the Children Fund";
  const amount = "5,000";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-gray-50 to-white px-6 text-center">
      {/* Success Icon */}
      <div className="bg-green-100 p-5 rounded-full mb-6 shadow-sm">
        <CheckCircle2 className="w-16 h-16 text-green-600" />
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 mb-3">
        Donation Successful!
      </h1>

      {/* Amount and Campaign */}
      <p className="text-gray-700 text-lg mb-2">
        Thank you for your generous donation of{" "}
        <span className="font-semibold text-green-700">₦{amount}</span>
      </p>

      <p className="text-gray-600 max-w-md mb-10">
        Your support for the campaign{" "}
        <span className="font-medium text-indigo-600">{title}</span> means a lot
        and helps us continue making an impact. 💚
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer justify-center gap-2 bg-indigo-600 text-white font-medium py-3 px-8 rounded-full hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Home className="w-5 h-5" />
          Go Home
        </button>

        <button
          onClick={() => navigate("/campaigns")}
          className="flex items-center cursor-pointer justify-center gap-2 border border-indigo-600 text-indigo-600 font-medium py-3 px-8 rounded-full hover:bg-indigo-50 transition-all duration-200"
        >
          <List className="w-5 h-5" />
          View Campaigns
        </button>
      </div>
    </div>
  );
};

export default DonationSuccess;