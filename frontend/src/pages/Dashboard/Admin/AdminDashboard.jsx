import React, { useEffect, useState } from "react";
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
import { fetchDashboardStats, fetchCampaigns } from "../../../api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    activeCampaigns: 0,
    pendingCampaigns: 0,
    totalDonations: 0,
    totalUsers: 0,
  });
  const [campaigns, setCampaigns] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch stats once on mount
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadStats();
  }, []);

  // Fetch campaigns when tab changes
  useEffect(() => {
    const loadCampaigns = async () => {
      setLoading(true);
      try {
        const data = await fetchCampaigns(activeTab);
        setCampaigns(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCampaigns();
  }, [activeTab]);

  // Filter campaigns by search term
  const filteredCampaigns = campaigns.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.creator?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header - Stacks on mobile, row on desktop */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Manage campaigns, creators, and platform settings
              </p>
            </div>
          </div>

          {/* Stats Grid - 1 col mobile, 2 cols tablet, 4 cols desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center transition-shadow hover:shadow-md">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 shrink-0">
                <FileText size={24} />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-500 truncate">
                  Active Campaigns
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeCampaigns}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center transition-shadow hover:shadow-md">
              <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-4 shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-500 truncate">
                  Pending Approvals
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingCampaigns}
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center transition-shadow hover:shadow-md">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4 shrink-0">
                <Users size={24} />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-500 truncate">
                  Creators
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalUsers}
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center transition-shadow hover:shadow-md">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-4 shrink-0">
                <CheckCircle size={24} />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-500 truncate">
                  Total Donations
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ₦
                  {stats.totalDonations.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Campaign Management Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            {/* Tabs - Flex allows wrapping or scrolling if needed, currently side by side */}
            <div className="border-b border-gray-200 flex flex-wrap">
              <button
                className={`px-4 md:px-6 py-3 text-sm font-medium cursor-pointer transition-colors ${
                  activeTab === "pending"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("pending")}
              >
                Pending Approval
              </button>
              <button
                className={`px-4 md:px-6 py-3 text-sm font-medium cursor-pointer transition-colors ${
                  activeTab === "approved"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("approved")}
              >
                Approved Campaigns
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200 bg-gray-50/50">
              <div className="relative w-full md:max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Search campaigns or creators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Table Container - CRITICAL for Horizontal Scroll */}
            <div className="w-full overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Creator
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Goal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        <div className="flex justify-center items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span>Loading campaigns...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredCampaigns.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        No campaigns found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredCampaigns.map((c) => (
                      <tr
                        key={c._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={c.images?.[0] || "/placeholder.png"}
                              alt={c.title}
                              className="h-10 w-10 rounded-md object-cover mr-4 bg-gray-200"
                            />
                            <div
                              className="text-sm font-medium text-gray-900 truncate max-w-[150px] md:max-w-[200px]"
                              title={c.title}
                            >
                              {c.title}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {c.creator}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {c.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₦ {Number(c.goalAmount || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end items-center space-x-3">
                            <Link
                              to={`/campaign/${c._id}`}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </Link>
                            {activeTab === "pending" && (
                              <>
                                <button
                                  className="text-green-600 hover:text-green-900"
                                  title="Approve"
                                >
                                  <CheckCircle size={18} />
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900"
                                  title="Reject"
                                >
                                  <XCircle size={18} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
