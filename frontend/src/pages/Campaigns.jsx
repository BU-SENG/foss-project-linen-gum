import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import CampaignCard from "../components/CampaignCard";
import { fetchAllCampaigns } from "../api";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Newest First");
  const [loading, setLoading] = useState(true);

  // Fetch campaigns on mount
  useEffect(() => {
    const loadCampaigns = async () => {
      setLoading(true);
      const data = await fetchAllCampaigns();
      setCampaigns(data);
      setLoading(false);
    };
    loadCampaigns();
  }, []);

  // Filter campaigns based on search query and category
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.createdBy?.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      campaign.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort campaigns based on selected option
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case "Most Funded":
        return (b.amountRaised || 0) - (a.amountRaised || 0);
      case "Ending Soon":
        return new Date(a.endDate) - new Date(b.endDate);
      case "Most Donors":
        return (b.numberOfDonors || 0) - (a.numberOfDonors || 0);
      case "Newest First":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gray-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-3">
            Browse Campaigns
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Discover campaigns that are making a difference and find causes that
            align with your values.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
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
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing{" "}
          <span className="font-semibold">{sortedCampaigns.length}</span>{" "}
          campaigns
        </p>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Loading campaigns...
            </div>
          ) : sortedCampaigns.length > 0 ? (
            sortedCampaigns.map((campaign) => (
              <CampaignCard key={campaign._id} campaign={campaign} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No campaigns found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
