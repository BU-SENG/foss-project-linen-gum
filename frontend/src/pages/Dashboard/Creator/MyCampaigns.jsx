import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  BarChart,
  LogOut,
  Search,
  Edit,
  Eye,
} from "lucide-react";
import { campaigns } from "../../../utils/mockData";

const MyCampaigns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Get mock creator campaigns
  const creatorCampaigns = campaigns.filter(
    (campaign) =>
      campaign.creator === "Water Aid Foundation" ||
      campaign.creator === "Education First"
  );

  // Apply filters
  const filteredCampaigns = creatorCampaigns.filter((campaign) => {
    const matchesSearch = campaign.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && campaign.isApproved) ||
      (statusFilter === "pending" && !campaign.isApproved);

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  My Campaigns
                </h1>
                <p className="text-gray-600">
                  Manage and track all your campaigns
                </p>
              </div>

              {/* New Campaign Button (Hardcoded) */}
              <div className="mt-4 md:mt-0">
                <Link to="/creator/create">
                  <button className="bg-blue-50 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium flex items-center">
                    <FilePlus size={16} className="mr-2" />
                    New Campaign
                  </button>
                </Link>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative md:col-span-2">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>

                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending Approval</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Showing {filteredCampaigns.length} campaigns
              </p>
            </div>

            {/* Campaigns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => {
                const progress =
                  (campaign.raisedAmount / campaign.goalAmount) * 100;

                return (
                  <div
                    key={campaign.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            campaign.isApproved
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {campaign.isApproved ? "Active" : "Pending"}
                        </span>

                        <span className="text-xs text-gray-500">
                          {campaign.daysLeft} days left
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {campaign.title}
                      </h3>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span className="font-semibold">
                          ₦{campaign.raisedAmount.toLocaleString()}
                        </span>
                        <span>of ₦{campaign.goalAmount.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{campaign.donorCount} donors</span>
                        <span>{Math.round(progress)}% funded</span>
                      </div>

                      <div className="flex gap-2">
                        {/* View button */}
                        <Link
                          to={`/campaign/${campaign.id}`}
                          className="flex-1"
                        >
                          <button className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center">
                            <Eye size={16} className="mr-1" />
                            View
                          </button>
                        </Link>

                        {/* Edit button */}
                        <Link
                          to={`/creator/edit/${campaign.id}`}
                          className="flex-1"
                        >
                          <button className="w-full bg-gray-50 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium flex items-center justify-center">
                            <Edit size={16} className="mr-1" />
                            Edit
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredCampaigns.length === 0 && (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No campaigns found
                </h3>
                <p className="text-gray-500 mb-6">
                  Create your first campaign to get started
                </p>

                <Link to="/creator/create">
                  <button className="bg-blue-50 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium">
                    Create Campaign
                  </button>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyCampaigns;
