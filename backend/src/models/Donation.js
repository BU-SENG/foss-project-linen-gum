import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
    },

    donorEmail: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    transactionId: {
      type: String,
    },
    txRef: { type: String, unique: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "successful", "failed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
