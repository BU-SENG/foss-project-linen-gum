import React from "react";
import { Link } from "react-router-dom";
import { campaignsData } from "../data/campaignsData";
import CampaignCard from "../components/CampaignCard";
import heroImage from "../assets/images/donate.webp";

// Get the first 3 campaigns for the featured section
const featuredCampaigns = campaignsData.slice(0, 3);

const Home = () => {
  return (
    <div className="w-full overflow-auto">
      {/* Hero section */}
      <section className="min-h-screen w-full">
        <main className="bg-blue-700 min-h-screen grid grid-cols-1 md:grid-cols-2 place-items-center px-4 md:px-16 py-8 md:py-0">
          <div className="text-white w-full max-w-md flex flex-col gap-4 text-center md:text-left">
            <h1 className="font-sans text-3xl md:text-4xl font-bold mt-0">
              Make a difference with your generosity.
            </h1>
            <p className="font-sans text-sm md:text-base text-white/75">
              Support causes you care about and help change lives through
              Aidly's trusted donation platform.
            </p>
            <div className="w-full md:w-fit flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              <Link to="/campaigns" className="w-full md:w-auto">
                <button className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-3 rounded-md border-none">
                  Browse Campaigns
                </button>
              </Link>
              <Link to="/donate" className="w-full md:w-auto">
                <button className="w-full bg-transparent hover:bg-white/10 transition-colors text-white px-4 py-3 rounded-md border border-white">
                  Start a Campaign
                </button>
              </Link>
            </div>
          </div>

          <img
            src={heroImage}
            alt="hero section"
            className="w-full max-w-xl h-auto aspect-[1.65/1] mt-8 md:mt-0 md:mr-[6%] rounded-lg object-cover"
          />
        </main>
      </section>

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

          {/* Campaign grid — displays 3 approved campaigns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>

          {/* Button linking to all campaigns page */}
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to make an impact?
              </h2>
              <p className="text-lg text-gray-600">
                Start a campaign or donate today to causes you care about.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/campaigns">
                <button className="w-full cursor-pointer inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200  border border-gray-300  text-white py-3 px-6  bg-blue-600">
                  Donate Now
                </button>
              </Link>
              <Link to="/auth">
                <button className="inline-flex cursor-pointer items-center justify-center font-medium rounded-md transition-colors duration-200 bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 text-base py-3 px-6">
                  Create Campaigns
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works  */}
      <section>
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto text-center px-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              How Aidly Works
            </h2>
            <p className="text-gray-500 mb-12">
              Our platform connects donors with verified campaigns to ensure
              your contribution makes a real impact.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="flex justify-center mb-4">
                  <i className="fa-regular fa-user text-blue-500 text-3xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Create a Campaign
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Campaign creators submit their causes for review. Our team
                  ensures all campaigns meet our guidelines.
                </p>
              </div>

              <div className="bg-blue-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="flex justify-center mb-4">
                  <i className="fa-solid fa-shield text-blue-500 text-3xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Verification Process
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Our admin team reviews and approves campaigns to ensure
                  legitimacy and transparency.
                </p>
              </div>

              <div className="bg-blue-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="flex justify-center mb-4">
                  <i className="fa-regular fa-heart text-blue-500 text-3xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Make a Difference
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Donors can contribute to approved campaigns with the option to
                  remain anonymous if desired.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;
