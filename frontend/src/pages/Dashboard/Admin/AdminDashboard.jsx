import React from "react";

function AdminDashboard() {
  return (
    <div className="bg-gray-100 min-h-screen flex font-sans">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col p-6">
        <h1 className="text-xl font-semibold mb-8">Aidly Admin</h1>

        <nav className="flex-1 space-y-2">
          <button className="flex items-center gap-3 p-3 rounded-lg bg-blue-100 text-blue-600 font-medium w-full text-left">
            <span>📊</span> Dashboard
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 w-full text-left">
            <span>📁</span> Campaigns
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 w-full text-left">
            <span>👤</span> Users
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 w-full text-left">
            <span>⚙️</span> Settings
          </button>
        </nav>

        <button className="mt-auto flex items-center gap-2 text-red-500 hover:text-red-600">
          <span>↩️</span> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">Exit Admin</button>
        </div>
        <p className="text-gray-500 mb-6">Manage campaigns, users, and platform settings</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="p-5 bg-white shadow rounded-lg">
            <p className="text-sm text-gray-500">Active Campaigns</p>
            <h3 className="text-2xl font-bold mt-2">5</h3>
          </div>

          <div className="p-5 bg-white shadow rounded-lg">
            <p className="text-sm text-gray-500">Pending Approvals</p>
            <h3 className="text-2xl font-bold mt-2 text-yellow-600">2</h3>
          </div>

          <div className="p-5 bg-white shadow rounded-lg">
            <p className="text-sm text-gray-500">Total Users</p>
            <h3 className="text-2xl font-bold mt-2 text-green-600">523</h3>
          </div>

          <div className="p-5 bg-white shadow rounded-lg">
            <p className="text-sm text-gray-500">Total Donations</p>
            <h3 className="text-2xl font-bold mt-2 text-purple-600">$157,892</h3>
          </div>

        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow p-6">

          {/* Tabs */}
          <div className="flex gap-6 border-b pb-3 mb-5">
            <button className="font-medium text-blue-600 border-b-2 border-blue-600 pb-2">
              Pending Approval (2)
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              Approved Campaigns (5)
            </button>
          </div>

          {/* Search + Filter */}
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              placeholder="Search campaigns or creators..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-blue-500"
            />
            <button className="border px-4 py-2 rounded-lg">Filter 🔍</button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">Campaign</th>
                  <th className="p-3">Creator</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Goal</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="p-3">Youth Sports Equipment Drive</td>
                  <td className="p-3">Youth Sports Alliance</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">Sports</span>
                  </td>
                  <td className="p-3">$15,000</td>
                  <td className="p-3">2023-11-05</td>
                  <td className="p-3 flex gap-3 text-xl">
                    <button className="text-blue-500">👁️</button>
                    <button className="text-green-500">✅</button>
                    <button className="text-red-500">❌</button>
                  </td>
                </tr>

                <tr>
                  <td className="p-3">Elderly Care Program</td>
                  <td className="p-3">Elder Care Network</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs">Healthcare</span>
                  </td>
                  <td className="p-3">$35,000</td>
                  <td className="p-3">2023-11-03</td>
                  <td className="p-3 flex gap-3 text-xl">
                    <button className="text-blue-500">👁️</button>
                    <button className="text-green-500">✅</button>
                    <button className="text-red-500">❌</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;

