import Campaign from "../models/Campaign.js";

// Creating a new campaign by a creator
export const createCampaign = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      images,
      fundingGoal,
      duration,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !fundingGoal ||
      !duration
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Validate funding goal
    if (fundingGoal <= 0) {
      return res.status(400).json({
        success: false,
        message: "Funding goal must be greater than 0",
      });
    }

    // Validate duration
    if (duration <= 0) {
      return res.status(400).json({
        success: false,
        message: "Duration must be greater than 0",
      });
    }

    // Create new campaign
    const newCampaign = new Campaign({
      title,
      description,
      category,
      location,
      images: images || [],
      fundingGoal,
      duration,
      createdBy: req.userId, // From auth middleware
    });

    await newCampaign.save();

    return res.status(201).json({
      success: true,
      message: "Campaign created successfully and pending approval",
      campaign: newCampaign,
    });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Fetching all approved campaigns
export const getAllCampaigns = async (req, res) => {
  try {
    // Fetch only approved campaigns and populate creator info
    const campaigns = await Campaign.find({ status: "approved" })
      .populate("createdBy", "fullName email")
      .sort({ dateCreated: -1 }); // Sort by newest first

    return res.status(200).json({
      success: true,
      count: campaigns.length,
      campaigns,
    });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get campaigns created by the logged-in creator
export const myCampaigns = async (req, res) => {
  try {
    // Fetch all campaigns created by the logged-in user
    const campaigns = await Campaign.find({ createdBy: req.userId }).sort({
      dateCreated: -1,
    }); // Sort by newest first

    return res.status(200).json({
      success: true,
      count: campaigns.length,
      campaigns,
    });
  } catch (error) {
    console.error("Error fetching creator's campaigns:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Fetching a single campaign by ID
export const getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate campaign ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid campaign ID format",
      });
    }

    // Fetch campaign and populate creator info
    const campaign = await Campaign.findById(id).populate(
      "createdBy",
      "fullName email"
    );

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    return res.status(200).json({
      success: true,
      campaign,
    });
  } catch (error) {
    console.error("Error fetching campaign:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Updating a creator's campaign
export const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      location,
      images,
      fundingGoal,
      duration,
    } = req.body;

    // Validate campaign ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid campaign ID format",
      });
    }

    // Find the campaign
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    // Check if the logged-in user is the creator of the campaign
    if (campaign.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this campaign",
      });
    }

    // Validate funding goal if provided
    if (fundingGoal !== undefined && fundingGoal <= 0) {
      return res.status(400).json({
        success: false,
        message: "Funding goal must be greater than 0",
      });
    }

    // Validate duration if provided
    if (duration !== undefined && duration <= 0) {
      return res.status(400).json({
        success: false,
        message: "Duration must be greater than 0",
      });
    }

    // Update only the fields that are provided
    if (title) campaign.title = title;
    if (description) campaign.description = description;
    if (category) campaign.category = category;
    if (location) campaign.location = location;
    if (images) campaign.images = images;
    if (fundingGoal) campaign.fundingGoal = fundingGoal;
    if (duration) campaign.duration = duration;

    // Save the updated campaign
    await campaign.save();

    return res.status(200).json({
      success: true,
      message: "Campaign updated successfully",
      campaign,
    });
  } catch (error) {
    console.error("Error updating campaign:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
