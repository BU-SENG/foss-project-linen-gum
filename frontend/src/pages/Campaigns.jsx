import React, { useState } from 'react';
import { Search, Users, Clock } from 'lucide-react';
import { campaignsData } from '../data/campaignsData';

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

        <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2 min-h-[3.5rem]">
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

        <button href="#" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-auto cursor-pointer">
          Donate Now
        </button>
      </div>
    </div>
  );
};

const Campaigns = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('Newest First');

  // Filter campaigns based on search query and category
  const filteredCampaigns = campaignsData.filter(campaign => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.organizer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All Categories' ||
      campaign.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort campaigns based on selected option
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case 'Most Funded':
        return b.raised - a.raised;
      case 'Ending Soon':
        return a.daysLeft - b.daysLeft;
      case 'Most Donors':
        return b.donors - a.donors;
      case 'Newest First':
      default:
        return b.id - a.id;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-3">
            Browse Campaigns
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Discover campaigns that are making a difference and find causes that align with your values.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-400 bg-white"
            />
          </div>

          {/* Category Filter */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-3 pr-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900 appearance-none cursor-pointer"
            >
              <option>All Categories</option>
              <option>Water & Sanitation</option>
              <option>Education</option>
              <option>Emergency Response</option>
              <option>Healthcare</option>
              <option>Animal Welfare</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          {/* Sort By */}
          <div className="relative min-w-[200px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-3 pr-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900 appearance-none cursor-pointer"
            >
              <option>Newest First</option>
              <option>Most Funded</option>
              <option>Ending Soon</option>
              <option>Most Donors</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing <span className="font-semibold">{sortedCampaigns.length}</span> campaigns
        </p>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCampaigns.length > 0 ? (
            sortedCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No campaigns found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
