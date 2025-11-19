import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  Search,
} from "lucide-react";
import Button from "../../../components/shared/Button";

import { pendingCampaigns, campaigns } from "../../../utils/mockData";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");

  const pendingCampaignsList = [...pendingCampaigns];

  const approvedCampaignsList = campaigns.filter(
    (campaign) => campaign.isApproved
  );

  const filteredPendingCampaigns = pendingCampaignsList.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApprovedCampaigns = approvedCampaignsList.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      label: "Active Campaigns",
      value: approvedCampaignsList.length,
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Pending Approvals",
      value: pendingCampaignsList.length,
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Total Users",
      value: 523,
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Total Donations",
      value: "$157,892",
      icon: CheckCircle,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="flex">

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage campaigns, users, and platform settings
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <Link to="/">
                  <Button variant="outline" size="sm">
                    <LogOut size={16} className="mr-2" />
                    Exit Admin
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div
                      className={w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mr-4}
                    >
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Campaign Management */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="flex flex-wrap">
                  <button
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === "pending"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("pending")}
                  >
                    Pending Approval ({filteredPendingCampaigns.length})
                  </button>

                  <button
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === "approved"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("approved")}
                  >
                    Approved Campaigns ({filteredApprovedCampaigns.length})
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>

                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                      placeholder="Search campaigns or creators..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <button className="inline-flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-2.5">
                    <Filter size={18} className="mr-2 text-gray-500" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Campaign
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Creator
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Goal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Pending Tab */}
                    {activeTab === "pending"
                      ? filteredPendingCampaigns.length > 0
                        ? filteredPendingCampaigns.map((campaign) => (
                            <tr key={campaign.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <img
                                    src={campaign.image}
                                    alt={campaign.title}
                                    className="h-10 w-10 rounded-md object-cover"
                                  />
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {campaign.title}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {campaign.creator}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {campaign.category}
                                </span>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                ${campaign.goalAmount.toLocaleString()}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {campaign.createdAt}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="flex justify-end space-x-2">
                                  <button className="text-blue-600 hover:text-blue-800">
                                    <Eye size={18} />
                                  </button>
                                  <button className="text-green-600 hover:text-green-800">
                                    <CheckCircle size={18} />
                                  </button>
                                  <button className="text-red-600 hover:text-red-800">
                                    <XCircle size={18} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        : (
                          <tr>
                            <td
                              colSpan={6}
                              className="px-6 py-4 text-center text-gray-500"
                            >
                              No pending campaigns found.
                            </td>
                          </tr>
                        )
                      : filteredApprovedCampaigns.length > 0
                      ? filteredApprovedCampaigns.map((campaign) => (
                          <tr key={campaign.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={campaign.image}
                                  alt={campaign.title}
                                  className="h-10 w-10 rounded-md object-cover"
                                />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {campaign.title}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {campaign.creator}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {campaign.category}
                              </span>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${campaign.goalAmount.toLocaleString()}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {campaign.createdAt}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex justify-end space-x-2">
                                <Link
                                  to={/campaign/${campaign.id}}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Eye size={18} />
                                </Link>

                                <button className="text-red-600 hover:text-red-800">
                                  <XCircle size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      : (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            No approved campaigns found.
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;