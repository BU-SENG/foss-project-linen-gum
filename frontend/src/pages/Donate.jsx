import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import { fetchCampaignById, initializeDonation } from "../api";
// import { initializeDonation } from "../services/donationService";
import toast from "react-hot-toast"

const Donate = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState("25");
  const [customAmount, setCustomAmount] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const loadCampaign = async () => {
      try {
        const data = await fetchCampaignById(id);
        setCampaign(data);
      } catch (error) {
        console.error("Failed to fetch campaign:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCampaign();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  if (!campaign || campaign.status !== "approved") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Campaign Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The campaign you're looking for doesn't exist or hasn't been approved
          yet.
        </p>
        <Link to="/campaigns">
          <button className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-md transition">
            Browse Campaigns
          </button>
        </Link>
      </div>
    );
  }

  const donationAmount =
    amount === "custom" ? parseFloat(customAmount) : parseFloat(amount);

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount("custom");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!donorName && !isAnonymous) {
      toast.error("Please enter your name or make your donation anonymous.");
      return;
    }

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const res = await initializeDonation({
        donorName: isAnonymous ? "Anonymous" : donorName,
        donorEmail: email,
        amount: donationAmount,
        campaignId: campaign._id,
        message,
      });

      if (res.success) {
        window.location.href = res.paymentLink;
      } else {
        toast.error(res.message || "Donation failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };



  return (
    <div className="bg-gray-50 min-h-screen w-full text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to={`/campaign/${id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to campaign</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left Form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Make a Donation
              </h1>

              <form onSubmit={handleSubmit}>
                {/* Preset Amounts */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Select an amount
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {["10", "25", "50", "100", "250", "500"].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`py-2 cursor-pointer px-4 rounded-md border transition ${
                          amount === value
                            ? "bg-blue-50 border-blue-600 text-blue-600"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => handleAmountSelect(value)}
                      >
                        ₦{value}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <label className="block text-gray-700 text-sm mb-1">
                    Custom amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">₦</span>
                    </div>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      className={`pl-7 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none ${
                        amount === "custom"
                          ? "border-blue-600 ring-1 ring-blue-600"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                    />
                  </div>
                </div>

                {/* Anonymous */}
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      id="anonymous"
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={() => setIsAnonymous(!isAnonymous)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="anonymous"
                      className="ml-2 block text-gray-700"
                    >
                      Make my donation anonymous
                    </label>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Your name will not be displayed publicly.
                  </p>
                </div>

                {/* Name */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Name{" "}
                    {!isAnonymous && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500"
                    required={!isAnonymous}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Message */}
                {/* <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Leave a message (optional)
                  </label>
                  <textarea
                    rows={3}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share a few words..."
                  />
                </div> */}

                {/* Payment Details */}
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment Details
                  </h2>

                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
                    <div className="flex items-center">
                      <CreditCard size={20} className="text-gray-400 mr-2" />
                      <span className="text-gray-700">Credit / Debit Card</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      (Demo mode — no real payment)
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-base py-3 px-6 rounded-md transition"
                  >
                    Donate ₦
                    {donationAmount ? donationAmount.toFixed(2) : "0.00"}
                  </button>

                  <p className="mt-4 text-sm text-gray-500 text-center">
                    By donating, you agree to our Terms of Service and Privacy
                    Policy.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Donation Summary
              </h2>

              <div className="flex items-center mb-6">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-gray-500">by {campaign.creator}</p>
                </div>
              </div>

              <div className="border-t border-b border-gray-200 py-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Donation amount</span>
                  <span className="font-medium text-gray-900">
                    ₦{donationAmount ? donationAmount.toFixed(2) : "0.00"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-700">Platform fee</span>
                  <span className="text-gray-900">₦0.00</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-medium text-gray-900">Total</span>
                <span className="font-semibold text-gray-900">
                  ₦{donationAmount ? donationAmount.toFixed(2) : "0.00"}
                </span>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                <p className="text-sm text-blue-800">
                  100% of your donation goes directly to this campaign.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
