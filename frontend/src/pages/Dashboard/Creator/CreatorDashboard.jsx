import React from "react";
import medicalImage from "../../../assets/images/medical.png";
import childrenImage from "../../../assets/images/children.png";

import {
	DollarSign,
	BarChart,
	Users,
	Clock,
	Info,
} from "lucide-react";

const campaignsData = [
	{
		id: 1,
		title: "Clean Water for Rural Communities",
		status: "Active",
		raised: "$32,450",
		goal: "$50,000",
		donors: 215,
		daysLeft: 12,
		image: medicalImage,
	},
	{
		id: 2,
		title: "Education for Underprivileged Children",
		status: "Active",
		raised: "$45,200",
		goal: "$75,000",
		donors: 302,
		daysLeft: 30,
		image: childrenImage,
	},
];

const CreatorDashboard = () => {
	return (
		<div className="flex min-h-screen bg-gray-100">
			<main className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-2 py-4 md:py-6">
				
				{/* HEADER */}
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start md:items-center gap-4 mb-6">
					<div>
						<h1 className="text-2xl md:text-3xl font-bold">Creator Dashboard</h1>
						<p className="text-gray-600 text-sm md:text-base">
							Manage your campaigns and track donations
						</p>
					</div>

					<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium whitespace-nowrap">
						+ New Campaign
					</button>
				</div>

				{/* STATS GRID */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
				{/* Total Raised */}
				<div className="bg-white rounded-lg shadow p-4 md:p-5 flex flex-col items-center">
					<div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
						<DollarSign className="text-green-600 w-6 h-6" />
					</div>
					<p className="mt-2 text-gray-600 text-base md:text-lg font-medium">Total Raised</p>
					<p className="text-xl md:text-2xl font-bold mt-1">$77,650</p>
				</div>					{/* Active Campaigns */}
					<div className="bg-white rounded-lg shadow p-4 md:p-5 flex flex-col items-center">
						<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
							<BarChart className="text-blue-600 w-6 h-6" />
						</div>
					<p className="mt-2 text-gray-600 text-base md:text-lg font-medium">Active Campaigns</p>
					<p className="text-xl md:text-2xl font-bold mt-1">2</p>
				</div>

				{/* Donors */}
					<div className="bg-white rounded-lg shadow p-4 md:p-5 flex flex-col items-center">
						<div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
							<Users className="text-purple-600 w-6 h-6" />
						</div>
					<p className="mt-2 text-gray-600 text-base md:text-lg font-medium">Total Donors</p>
					<p className="text-xl md:text-2xl font-bold mt-1">3</p>
				</div>

				{/* Pending */}
					<div className="bg-white rounded-lg shadow p-4 md:p-5 flex flex-col items-center">
						<div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
							<Clock className="text-yellow-600 w-6 h-6" />
						</div>
					<p className="mt-2 text-gray-600 text-base md:text-lg font-medium">Pending Approval</p>
					<p className="text-xl md:text-2xl font-bold mt-1">0</p>
				</div>
			</div>				{/* CAMPAIGN TABLE */}
				<div className="bg-white rounded-lg shadow p-4 md:p-5 overflow-x-auto">
					<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
						<h2 className="text-base md:text-lg font-medium">My Campaigns</h2>

						<input
							type="text"
							placeholder="Search campaigns…"
							className="border px-3 py-2 rounded-lg w-full md:w-56 text-sm focus:ring focus:ring-blue-200"
						/>
					</div>

					<table className="w-full border-collapse text-xs md:text-sm">
						<thead>
							<tr className="border-b bg-gray-50 text-gray-600">
								<th className="p-2 md:p-3 text-left">Campaign</th>
								<th className="p-2 md:p-3 text-left">Status</th>
								<th className="p-2 md:p-3 text-left hidden sm:table-cell">Raised</th>
								<th className="p-2 md:p-3 text-left hidden md:table-cell">Goal</th>
								<th className="p-2 md:p-3 text-left hidden lg:table-cell">Donors</th>
								<th className="p-2 md:p-3 text-left">Days</th>
								<th className="p-2 md:p-3 text-left">Actions</th>
							</tr>
						</thead>

						<tbody>
							{campaignsData.map((campaign) => (
								<tr key={campaign.id} className="border-b hover:bg-gray-50">
									<td className="p-2 md:p-3 flex items-center gap-2 md:gap-3">
										<img
											src={campaign.image}
											className="w-8 h-8 md:w-10 md:h-10 rounded-md object-cover"
											alt={campaign.title}
										/>
										<span className="font-medium text-xs md:text-sm line-clamp-1">{campaign.title}</span>
									</td>
									<td className="p-2 md:p-3">
										<span
											className={`px-2 py-1 text-xs rounded-full text-white ${
												campaign.status === "Active"
													? "bg-green-500"
													: "bg-gray-500"
											}`}
										>
											{campaign.status}
										</span>
									</td>
									<td className="p-2 md:p-3 hidden sm:table-cell text-xs md:text-sm">{campaign.raised}</td>
									<td className="p-2 md:p-3 hidden md:table-cell text-xs md:text-sm">{campaign.goal}</td>
									<td className="p-2 md:p-3 hidden lg:table-cell text-xs md:text-sm">{campaign.donors}</td>
									<td className="p-2 md:p-3 text-xs md:text-sm">{campaign.daysLeft}</td>

									<td className="p-2 md:p-3 space-x-1 md:space-x-3 text-xs md:text-sm">
										<button className="text-blue-600 hover:underline">View</button>
										<button className="text-gray-600 hover:underline hidden sm:inline">Edit</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* HELP BANNER */}
					<div className="mt-5 p-3 md:p-4 bg-blue-50 border border-blue-200 rounded-lg flex flex-col md:flex-row gap-3 md:gap-4">
						<div className="pt-1 flex-shrink-0">
							<Info className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
						</div>

						<div>
							<h3 className="text-sm md:text-base font-medium text-blue-700">
								Need help with your campaigns?
							</h3>
							<p className="text-xs md:text-sm text-blue-800 mt-1">
								Check out our{" "}
								<a href="/campaign-guidelines" className="underline">
									campaign guidelines
								</a>{" "}
								or{" "}
								<a href="/contact-support" className="underline">
									contact support
								</a>{" "}
								if you have any questions.
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default CreatorDashboard;
