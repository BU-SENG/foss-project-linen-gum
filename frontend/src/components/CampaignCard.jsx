import React from "react";
import { Link } from "react-router-dom";
import { Users, Clock } from "lucide-react";

const CampaignCard = ({ campaign }) => {
  const progressPercentage = (campaign.raised / campaign.goal) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden shrink-0">
        <img
          src={campaign.image}
          alt={campaign.title || 'Campaign image'}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6 flex flex-col grow">
        <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-3 w-fit">
          {campaign.category}
        </span>

        <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2 min-h-14">
          {campaign.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 min-h-22">
          {campaign.description}
        </p>

        <p className="text-sm text-gray-500 mb-4 line-clamp-1">
          by <span className="font-medium text-gray-700">{campaign.organizer}</span>
        </p>

        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-xl font-bold text-gray-900">
                ${campaign.raised.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                raised of ${campaign.goal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{campaign.donors} donors</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{campaign.daysLeft} days left</span>
          </div>
        </div>

        <Link
          to={`/donate/${campaign.id}`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-auto cursor-pointer text-center block"
        >
          Donate Now
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
