import React from "react";
import { DollarSign, BarChart, Users, Hourglass } from "lucide-react";
import medicalImage from "../../../assets/images/medical.png";
import childrenImage from "../../../assets/images/children.png";

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
			{/* Main Content */}
			<main className="flex-1 p-8">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">Creator Dashboard</h1>
					<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
						+ New Campaign
					</button>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-4 gap-4 mb-6">
					<div className="bg-white p-4 rounded shadow flex flex-col items-center">
						<DollarSign className="text-green-500 w-6 h-6" />
						<span className="mt-2 font-semibold text-lg">Total Raised</span>
						<span className="mt-1 text-gray-700">$77,650</span>
					</div>
					<div className="bg-white p-4 rounded shadow flex flex-col items-center">
						<BarChart className="text-blue-500 w-6 h-6" />
						<span className="mt-2 font-semibold text-lg">Active Campaigns</span>
						<span className="mt-1 text-gray-700">2</span>
					</div>
					<div className="bg-white p-4 rounded shadow flex flex-col items-center">
						<Users className="text-purple-500 w-6 h-6" />
						<span className="mt-2 font-semibold text-lg">Total Donors</span>
						<span className="mt-1 text-gray-700">3</span>
					</div>
					<div className="bg-white p-4 rounded shadow flex flex-col items-center">
						<Hourglass className="text-yellow-500 w-6 h-6" />
						<span className="mt-2 font-semibold text-lg">Pending Approval</span>
						<span className="mt-1 text-gray-700">0</span>
					</div>
				</div>

				{/* Campaign Table */}
				<div className="bg-white rounded shadow p-4">
					<div className="flex justify-between items-center mb-4 border-b pb-2">
						<h2 className="text-lg font-semibold">My Campaigns</h2>
						<input
							type="text"
							placeholder="Search campaigns..."
							className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200"
						/>
					</div>

					<table className="min-w-full table-auto">
						<thead>
							<tr className="text-left border-b">
								<th className="p-2">Campaign</th>
								<th className="p-2">Status</th>
								<th className="p-2">Raised</th>
								<th className="p-2">Goal</th>
								<th className="p-2">Donors</th>
								<th className="p-2">Days Left</th>
								<th className="p-2">Actions</th>
							</tr>
						</thead>
						<tbody>
							{campaignsData.map((campaign) => (
								<tr
									key={campaign.id}
									className="border-b hover:bg-gray-50"
								>
									<td className="p-2 flex items-center gap-2">
										<img
											src={campaign.image}
											alt="campaign"
											className="w-10 h-10 rounded"
										/>
										{campaign.title}
									</td>
									<td className="p-2">
										<span
											className={`px-2 py-1 rounded text-white ${
												campaign.status === "Active"
													? "bg-green-500"
													: "bg-gray-500"
											}`}
										>
											{campaign.status}
										</span>
									</td>
									<td className="p-2">{campaign.raised}</td>
									<td className="p-2">{campaign.goal}</td>
									<td className="p-2">{campaign.donors}</td>
									<td className="p-2">{campaign.daysLeft}</td>
									<td className="p-2 space-x-2">
										<button className="text-blue-600 hover:underline">
											View
										</button>
										<button className="text-gray-600 hover:underline">
											Edit
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className="mt-4 p-4 bg-blue-50 rounded text-blue-700 text-sm">
						Need help with your campaigns? Check out our{" "}
						<a href="#" className="underline">
							campaign guidelines
						</a>{" "}
						or{" "}
						<a href="#" className="underline">
							contact support
						</a>{" "}
						if you have any questions.
					</div>
				</div>
			</main>
		</div>
	);
};

export default CreatorDashboard;
