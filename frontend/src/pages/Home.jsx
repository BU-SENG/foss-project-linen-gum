import React from "react";
import { Link } from "react-router-dom";
import { campaignsData } from "../data/campaignsData";
import CampaignCard from "../components/CampaignCard";

const featuredCampaigns = campaignsData
  .filter((campaign) => campaign.isApproved)
  .slice(0, 3);

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero section */}
      <section></section>

      {/* Featured campaigns section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Campaigns
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These campaigns are making a real impact. Your contribution, no
              matter how small, can help them reach their goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/campaigns">
              <button className="cursor-pointer inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 text-base py-3 px-6">
                View All Campaigns
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section></section>
    </div>
  );
};

export default Home;
