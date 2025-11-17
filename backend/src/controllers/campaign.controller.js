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
                message: "All required fields must be provided",
            });
        }

        // Validate funding goal and duration are positive numbers
        if (fundingGoal <= 0 || duration <= 0) {
            return res.status(400).json({
                success: false,
                message: "Funding goal and duration must be positive numbers",
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
            createdBy: req.userId, // From verifyToken middleware
        });

        await newCampaign.save();

        res.status(201).json({
            success: true,
            message: "Campaign created successfully and pending approval",
            campaign: newCampaign,
        });
    } catch (error) {
        console.error("Error creating campaign:", error);
        res.status(500).json({
            success: false,
            message: "Server error while creating campaign",
            error: error.message,
        });
    }
};

// Fetching all approved campaigns
export const getAllCampaigns = async (req, res) => {
    try {
        const { category, location, search } = req.query;

        // Build filter object for approved campaigns only
        const filter = { status: "approved" };

        if (category) {
            filter.category = category;
        }

        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        const campaigns = await Campaign.find(filter)
            .populate("createdBy", "fullName email")
            .sort({ dateCreated: -1 });

        res.status(200).json({
            success: true,
            count: campaigns.length,
            campaigns,
        });
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching campaigns",
            error: error.message,
        });
    }
};

// Get campaigns created by the logged-in creator
export const myCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ createdBy: req.userId })
            .populate("createdBy", "fullName email")
            .sort({ dateCreated: -1 });

        res.status(200).json({
            success: true,
            count: campaigns.length,
            campaigns,
        });
    } catch (error) {
        console.error("Error fetching creator's campaigns:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching your campaigns",
            error: error.message,
        });
    }
};

// Fetching a single campaign by ID
export const getCampaignById = async (req, res) => {
    try {
        const { id } = req.params;

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

        res.status(200).json({
            success: true,
            campaign,
        });
    } catch (error) {
        console.error("Error fetching campaign:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching campaign",
            error: error.message,
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

        // Find the campaign
        const campaign = await Campaign.findById(id);

        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: "Campaign not found",
            });
        }

        // Check if the logged-in creator owns this campaign
        if (campaign.createdBy.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this campaign",
            });
        }

        // Prepare update object
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (category) updateData.category = category;
        if (location) updateData.location = location;
        if (images) updateData.images = images;
        if (fundingGoal) {
            if (fundingGoal <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Funding goal must be a positive number",
                });
            }
            updateData.fundingGoal = fundingGoal;
        }
        if (duration) {
            if (duration <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Duration must be a positive number",
                });
            }
            updateData.duration = duration;
        }

        // Reset status to pending if any changes are made
        updateData.status = "pending";

        const updatedCampaign = await Campaign.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        }).populate("createdBy", "fullName email");

        res.status(200).json({
            success: true,
            message: "Campaign updated successfully and pending approval",
            campaign: updatedCampaign,
        });
    } catch (error) {
        console.error("Error updating campaign:", error);
        res.status(500).json({
            success: false,
            message: "Server error while updating campaign",
            error: error.message,
        });
    }
};

