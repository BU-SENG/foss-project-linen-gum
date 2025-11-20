import React from "react";
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

const campaigns = [
  {
    title: "Clean Water for Rural Communities",
    creator: "Water Aid Foundation",
    status: "Approved",
    category: "Environment",
    raised: "$32,450",
    goal: "$50,000",
    donors: 215,
    image:
      "https://www.istockphoto.com/photo/little-african-boy-drinking-healthy-clean-water-from-tap-gm618053488-107447045",
  },
  {
    title: "Education for Underprivileged Children",
    creator: "Education First",
    status: "Approved",
    category: "Education",
    raised: "$45,201",
    goal: "$75,000",
    donors: 303,
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Emergency Relief for Natural Disaster Victims",
    creator: "Global Relief",
    status: "Approved",
    category: "Disaster Relief",
    raised: "$87,500",
    goal: "$100,000",
    donors: 1240,
    image:
      "https://images.unsplash.com/photo-1508433957232-2a1d3a17fd36?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Medical Supplies for Rural Clinics",
    creator: "Healthcare for All",
    status: "Approved",
    category: "Healthcare",
    raised: "$12,750",
    goal: "$20,000",
    donors: 85,
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Animal Shelter Renovation",
    creator: "Animal Rescue League",
    status: "Approved",
    category: "Animals",
    raised: "$8,300",
    goal: "$25,000",
    donors: 124,
    image:
      "https://images.unsplash.com/photo-1554475901-4538ddfbccc1?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Community Garden Project",
    creator: "Green City Initiative",
    status: "Pending",
    category: "Environment",
    raised: "$4,200",
    goal: "$10,000",
    donors: 58,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Youth Sports Equipment Drive",
    creator: "Youth Sports Alliance",
    status: "Pending",
    category: "Sports",
    raised: "$0",
    goal: "$15,000",
    donors: 0,
    image:
      "https://images.unsplash.com/photo-1543352634-404b8f9e3100?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Elderly Care Program",
    creator: "Elder Care Network",
    status: "Pending",
    category: "Healthcare",
    raised: "$0",
    goal: "$25,000",
    donors: 0,
    image:
      "https://images.unsplash.com/photo-1581539250439-cd1efcbf1a35?auto=format&fit=crop&w=400&q=80",
  },
];

function AdminCampaignList() {
  return (
      <div className="w-full p-6">
      <h2 className="text-2xl font-semibold">Campaign Management</h2>
      <p className="text-gray-500 mb-6">
        View and manage all campaigns on the platform
      </p>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <input
          placeholder="Search campaigns or creators..."
          className="w-1/3 p-3 bg-white border rounded-xl"
        />

        <select className="p-3 bg-white cursor-pointer border rounded-xl">
          <option>All Status</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>

        <select className="p-3 bg-white border rounded-xl">
          <option>All Categories</option>
          <option>Environment</option>
          <option>Education</option>
          <option>Healthcare</option>
          <option>Animals</option>
          <option>Sports</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
        <p className="text-gray-600 mb-3">
          Showing {campaigns.length} campaigns
        </p>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="p-3">Campaign</th>
              <th className="p-3">Creator</th>
              <th className="p-3">Status</th>
              <th className="p-3">Category</th>
              <th className="p-3">Raised / Goal</th>
              <th className="p-3">Donors</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((c, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={c.image}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <span className="font-medium">{c.title}</span>
                </td>

                <td className="p-3">{c.creator}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      c.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : c.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="p-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {c.category}
                  </span>
                </td>

                <td className="p-3">
                  {c.raised} / {c.goal}
                </td>

                <td className="p-3">{c.donors}</td>

                <td className="p-3 flex items-center gap-3">
                  <Eye className="w-5 h-5 text-blue-600 cursor-pointer" />
                  <CheckCircle className="w-5 h-5 text-green-600 cursor-pointer" />
                  <XCircle className="w-5 h-5 text-red-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCampaignList;
