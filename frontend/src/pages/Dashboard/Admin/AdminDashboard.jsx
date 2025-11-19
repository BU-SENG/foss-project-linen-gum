import React from "react";
import { Eye, XCircle } from "lucide-react";

const campaigns = [
  {
    title: "Clean Water for Rural Communities",
    creator: "Water Aid Foundation",
    status: "Approved",
    category: "Environment",
    raised: "$32,450",
    goal: "$50,000",
    donors: 215,
    image: "https://via.placeholder.com/60",
  },
  {
    title: "Education for Underprivileged Children",
    creator: "Education First",
    status: "Approved",
    category: "Education",
    raised: "$45,200",
    goal: "$75,000",
    donors: 302,
    image: "https://via.placeholder.com/60",
  },
];

function AdminDashboard() {
  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-semibold mb-4">Campaign Management</h2>

      <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
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
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <span>{c.title}</span>
                </td>
                <td className="p-3">{c.creator}</td>
                <td className="p-3">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
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
                  <Eye className="w-5 h-5 text-blue-600" />
                  <XCircle className="w-5 h-5 text-red-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;

