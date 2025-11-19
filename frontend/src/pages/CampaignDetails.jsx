import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Share2, Flag } from "lucide-react";
import { fetchCampaignById } from "../api"; // Adjust the path if needed

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  // Button styling
  const buttonBase =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200";
  const buttonPrimary = "bg-blue-600 hover:bg-blue-700 text-white";
  const buttonLG = "text-base py-3 px-6 w-full";

  useEffect(() => {
    const getCampaign = async () => {
      setLoading(true);
      const data = await fetchCampaignById(id);
      setCampaign(data);
      setLoading(false);
    };

    getCampaign();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Loading campaign details...</p>
      </div>
    );
  }

  if (!campaign || campaign.status !== "approved") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Campaign Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The campaign you're looking for doesn't exist or hasn't been approved
          yet.
        </p>

        <Link to="/campaigns">
          <button
            className={`${buttonBase} ${buttonPrimary} text-sm py-2 px-4`}
          >
            Browse Campaigns
          </button>
        </Link>
      </div>
    );
  }

  const progress = (campaign.amountRaised / campaign.fundingGoal) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Section */}
        <div className="lg:col-span-2">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {campaign.title}
          </h1>

          <div className="flex items-center mb-6 text-sm text-gray-500">
            <div className="mr-4 flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>
                Created {new Date(campaign.dateCreated).toLocaleDateString()}
              </span>
            </div>

            <div className="mr-4 flex items-center">
              <MapPin size={16} className="mr-1" />
              <span>{campaign.location}</span>
            </div>

            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{campaign.daysLeft} days left</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="font-medium text-blue-600">
                  {campaign.createdBy.fullName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Campaign by</p>
                <p className="font-medium">{campaign.createdBy.fullName}</p>
              </div>
            </div>

            {/* <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <Flag size={20} />
              </button>
            </div> */}
          </div>

          {/* About Campaign */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">About this campaign</h2>
            <p className="text-gray-700 mb-6">{campaign.description}</p>
          </div>

          {/* Donations */}
          {/* <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
            {campaign.recentDonations?.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {campaign.recentDonations.map((donation) => (
                  <div key={donation._id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <span className="font-medium text-gray-600">
                            {donation.donor.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{donation.donor}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(donation.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-green-600">
                        ${donation.amount}
                      </p>
                    </div>
                    {donation.message && (
                      <p className="mt-2 text-gray-600 text-sm pl-13">
                        {donation.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No donations yet. Be the first to donate!
              </p>
            )}
          </div> */}
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900">
                  ₦{campaign.amountRaised.toLocaleString()}
                </span>
                <span className="text-gray-500">
                  raised of ₦{campaign.fundingGoal.toLocaleString()}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>

              <div className="flex items-center text-gray-500 text-sm">
                <Users size={16} className="mr-1" />
                <span>{campaign.donorCount} donors</span>
              </div>
            </div>

            <Link to={`/donate/${campaign._id}`}>
              <button className={`${buttonBase} ${buttonPrimary} ${buttonLG}`}>
                Donate Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
