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
import Button from "../../../components/shared/Button";
import { fetchDashboardStats, fetchCampaigns } from "../../../api/admin";

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
      c.createdBy?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage campaigns, creators, and platform settings
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
            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Campaigns
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeCampaigns}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-4">
                <AlertTriangle size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending Approvals
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingCampaigns}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Creators</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalUsers}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-4">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
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

          {/* Campaign management */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            {/* Tabs */}
            <div className="border-b border-gray-200 flex">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "pending"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("pending")}
              >
                Pending Approval
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === "approved"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("approved")}
              >
                Approved Campaigns
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4">
              <div className="relative grow">
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
              <div>
                <button className="inline-flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-2.5">
                  <Filter size={18} className="mr-2 text-gray-500" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Campaign list */}
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
                  {loading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        Loading campaigns...
                      </td>
                    </tr>
                  ) : filteredCampaigns.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No campaigns found.
                      </td>
                    </tr>
                  ) : (
                    filteredCampaigns.map((c) => (
                      <tr key={c._id}>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center">
                          <img
                            src={c.images?.[0] || "/placeholder.png"}
                            alt={c.title}
                            className="h-10 w-10 rounded-md object-cover mr-4"
                          />
                          <div className="text-sm font-medium text-gray-900">
                            {c.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {c.creator}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {c.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₦ {Number(c.goalAmount || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end space-x-2">
                          <Link
                            to={`/campaign/${c._id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye size={18} />
                          </Link>
                          {activeTab === "pending" && (
                            <>
                              <button className="text-green-600 hover:text-green-800">
                                <CheckCircle size={18} />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
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
