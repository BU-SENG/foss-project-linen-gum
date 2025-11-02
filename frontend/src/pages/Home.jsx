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
<<<<<<< Updated upstream
      <section className="min-h-screen w-full">
        <main className="bg-blue-700 min-h-screen grid grid-cols-1 md:grid-cols-2 place-items-center px-4 md:px-16 py-8 md:py-0">
          <div className="text-white w-full max-w-[480px] flex flex-col gap-4 text-center md:text-left">
            <h1 className="font-sans text-3xl md:text-4xl font-bold mt-0">Make a difference with your generosity.</h1>
            <p className="font-sans text-sm md:text-base text-white/75">Support causes you care about and help change lives through Aidly's trusted donation platform.</p>
            <div className="w-full md:w-fit flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              <Link to="/campaigns" className="w-full md:w-auto">
                <button className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-3 rounded-md border-none">
=======
         <section className="min-h-[calc(100vh-4rem)] w-full">
           <main className="bg-blue-700 min-h-[calc(100vh-4rem)] grid grid-cols-2 items-center px-16">
          <div className="text-white w-[480px] flex flex-col gap-4">
            <h1 className="font-sans text-4xl font-bold mt-0">Make a difference with your generosity.</h1>
            <p className="font-sans text-sm text-white/75">Support causes you care about and help change lives through Aidly's trusted donation platform.</p>
            <div className="w-fit flex gap-4">
              <Link to="/campaigns">
                <button className="bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-3 rounded-md border-none">
>>>>>>> Stashed changes
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
            className="w-full max-w-[560px] h-auto aspect-[1.65/1] mt-8 md:mt-0 md:mr-[6%] rounded-lg object-cover"
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
      <section></section>
    </div>
  );
};

export default Home;
