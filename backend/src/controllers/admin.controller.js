import Campaign from "../models/Campaign.js";
import Creator from "../models/Creator.js";


// Dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    // Count active campaigns (approved)
    const activeCampaigns = await Campaign.countDocuments({
      status: "approved",
    });

    // Count pending campaigns
    const pendingCampaigns = await Campaign.countDocuments({
      status: "pending",
    });

    // Sum total amount raised from all campaigns
    const totalDonationsAgg = await Campaign.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amountRaised" }, // sum the amountRaised field
        },
      },
    ]);

    const totalDonations = totalDonationsAgg[0]?.total || 0;

    // Total creators
    const totalUsers = await Creator.countDocuments();

    res.json({
      success: true,
      stats: {
        activeCampaigns,
        pendingCampaigns,
        totalDonations,
        totalUsers,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get campaigns for admin
export const getAdminCampaigns = async (req, res) => {
  try {
    const { status } = req.query; // get status from query param

    // Build filter
    const filter = {};
    if (status) filter.status = status;

    const campaigns = await Campaign.find(filter)
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 });

    const formatted = campaigns.map((c) => ({
      _id: c._id, // use _id for frontend
      image: c.images?.length > 0 ? c.images[0] : "",
      title: c.title,
      creator: c.createdBy?.fullName || "Unknown",
      status: c.status, // keep status as string
      category: c.category,
      raisedAmount: c.amountRaised || 0,
      goalAmount: c.fundingGoal || 0,
      donorCount: c.numberOfDonors || 0,
      createdAt: c.createdAt,
    }));

    res.status(200).json({
      success: true,
      campaigns: formatted,
    });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch campaigns",
    });
  }
};
