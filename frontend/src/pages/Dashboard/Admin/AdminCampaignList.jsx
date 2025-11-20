import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, XCircle, CheckCircle, AlertTriangle, Search } from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchCampaigns,
  approveCampaign,
  rejectCampaign,
  suspendCampaign,
} from "../../../api";

const AdminCampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Default is "all" so all campaigns show on load
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Education",
    "Healthcare",
    "Environment",
    "Disaster Relief",
    "Animals",
    "Sports",
  ];

  // Fetch campaigns
  const loadCampaigns = async () => {
    setLoading(true);
    try {
      // Assuming the API handles "all" to return everything
     const queryStatus = statusFilter === "all" ? "" : statusFilter;
     const data = await fetchCampaigns(queryStatus);
     setCampaigns(data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      toast.error("Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, [statusFilter]);

  // Approve campaign
  const handleApprove = async (id) => {
    try {
      const updatedCampaign = await approveCampaign(id);
      setCampaigns((prev) =>
        prev.map((c) => (c._id === id ? updatedCampaign : c))
      );
      toast.success("Campaign approved successfully");
    } catch (error) {
      console.error("Approve error:", error);
      toast.error("Error approving campaign");
    }
  };

  // Reject campaign
  const handleReject = async (id) => {
    try {
      const updatedCampaign = await rejectCampaign(id);
      setCampaigns((prev) =>
        prev.map((c) => (c._id === id ? updatedCampaign : c))
      );
      toast.success("Campaign rejected successfully");
    } catch (error) {
      console.error("Reject error:", error);
      toast.error("Error rejecting campaign");
    }
  };

  // Suspend campaign
  const handleSuspend = async (id) => {
    try {
      const updatedCampaign = await suspendCampaign(id);
      setCampaigns((prev) =>
        prev.map((c) => (c._id === id ? updatedCampaign : c))
      );
      toast.success("Campaign suspended successfully");
    } catch (error) {
      console.error("Suspend error:", error);
      toast.error("Error suspending campaign");
    }
  };

  // Filtering logic
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.creator?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;

    const matchesCategory =
      categoryFilter === "all" || campaign.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="flex flex-col">
      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Campaign Management
            </h1>
            <p className="text-gray-600">
              View and manage all campaigns on the platform
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative md:col-span-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search campaigns or creators..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status */}
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="suspended">Suspended</option>
              </select>

              {/* Category */}
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredCampaigns.length} campaigns
          </p>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Raised / Goal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donors
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
                        colSpan={7}
                        className="text-center py-6 text-gray-500"
                      >
                        Loading campaigns...
                      </td>
                    </tr>
                  ) : filteredCampaigns.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-6 text-gray-500"
                      >
                        No campaigns found
                      </td>
                    </tr>
                  ) : (
                    filteredCampaigns.map((campaign) => (
                      <tr key={campaign._id}>
                        {/* Campaign */}
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

                        {/* Creator */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {campaign.creator}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {campaign.status === "approved" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Approved
                            </span>
                          ) : campaign.status === "pending" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          ) : campaign.status === "suspended" ? (
                            <span className="px-2 py-1 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800">
                              Suspended
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Rejected
                            </span>
                          )}
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {campaign.category}
                          </span>
                        </td>

                        {/* Raised / Goal */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₦{Number(campaign.raisedAmount || 0).toLocaleString()}{" "}
                          / ₦{Number(campaign.goalAmount || 0).toLocaleString()}
                        </td>

                        {/* Donors */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {campaign.donorCount || 0}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end items-center space-x-2">
                            {/* PENDING: Show Approve & Reject */}
                            {campaign.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(campaign._id)}
                                  className="text-green-600 hover:text-green-800"
                                  title="Approve"
                                >
                                  <CheckCircle size={18} />
                                </button>

                                <button
                                  onClick={() => handleReject(campaign._id)}
                                  className="text-red-600 hover:text-red-800"
                                  title="Reject"
                                >
                                  <XCircle size={18} />
                                </button>
                              </>
                            )}

                            {/* SUSPENDED: Show Approve only */}
                            {campaign.status === "suspended" && (
                              <button
                                onClick={() => handleApprove(campaign._id)}
                                className="text-green-600 hover:text-green-800"
                                title="Re-Approve"
                              >
                                <CheckCircle size={18} />
                              </button>
                            )}

                            {/* APPROVED: Show Suspend (Alert) only */}
                            {campaign.status === "approved" && (
                              <button
                                onClick={() => handleSuspend(campaign._id)}
                                className="text-yellow-600 hover:text-yellow-800"
                                title="Suspend"
                              >
                                <AlertTriangle size={18} />
                              </button>
                            )}

                            {/* REJECTED: Shows no action buttons (only Eye below) */}

                            {/* ALL STATUSES: Always show Eye */}
                            <Link
                              to={`/campaign/${campaign._id}`}
                              className="text-blue-600 hover:text-blue-800"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </Link>
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

export default AdminCampaignList;
