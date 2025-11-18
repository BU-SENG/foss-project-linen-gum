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
