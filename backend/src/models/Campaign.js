import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Education",
        "Health",
        "Technology",
        "Environment",
        "Community",
        "Business",
        "Charity",
        "Art",
        "Other",
      ],
    },
    location: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // store image URLs or file paths
      },
    ],
    fundingGoal: {
      type: Number, // amount to be raised
      required: true,
    },
    amountRaised: {
      type: Number,
      default: 0,
    },
    numberOfDonors: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number, // number of days
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);
