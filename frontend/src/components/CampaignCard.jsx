import React from "react";
import { Link } from "react-router-dom";
import { Users, Clock } from "lucide-react";

const CampaignCard = ({ campaign }) => {
  const raised = campaign.amountRaised || 0;
  const goal = campaign.fundingGoal || 1; // avoid division by zero
  const progressPercentage = (raised / goal) * 100;

  // Calculate days left
  const today = new Date();
  const endDate = campaign.endDate ? new Date(campaign.endDate) : null;
  const daysLeft = endDate
    ? Math.max(Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)), 0)
    : null;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Image Section */}
      <Link to={`/campaign/${campaign._id}`}>
        <img
          src={campaign.images?.[0] || "/placeholder.png"}
          alt={campaign.title || "Campaign image"}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content Section */}
      <div className="p-4 flex flex-col grow">
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {campaign.category || "General"}
          </span>
        </div>

        <Link
          to={`/campaign/${campaign._id}`}
          className="block hover:text-blue-600 transition-colors duration-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {campaign.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {campaign.description || "No description available."}
        </p>

        <p className="text-gray-500 text-sm mb-3">
          by{" "}
          <span className="font-medium">
            {campaign.createdBy?.fullName || "Unknown"}
          </span>
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span className="font-semibold">₦ {raised.toLocaleString()}</span>
          <span>raised of ₦ {goal.toLocaleString()}</span>
        </div>

        {/* Donors and Time */}
        <div className="flex justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            <span>{campaign.numberOfDonors || 0} donors</span>
          </div>
          {daysLeft !== null && (
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>
                {daysLeft} {daysLeft === 1 ? "day" : "days"} left
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Donate Section */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <Link
          to={`/donate/${campaign._id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
        >
          Donate Now
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
