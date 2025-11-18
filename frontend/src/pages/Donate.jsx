import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, CheckCircle } from 'lucide-react'
import { campaigns } from '../utils/mockData'

const Donate = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [amount, setAmount] = useState('25')
  const [customAmount, setCustomAmount] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [donorName, setDonorName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  // Find campaign
  const campaign = campaigns.find((c) => c.id === id)

  if (!campaign || !campaign.isApproved) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h1>
        <p className="text-gray-600 mb-8">
          The campaign you're looking for doesn't exist or hasn't been approved yet.
        </p>

        {/* Manual button styling */}
        <Link to="/campaigns">
          <button className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-md transition">
            Browse Campaigns
          </button>
        </Link>
      </div>
    )
  }

  const handleAmountSelect = (value) => {
    setAmount(value)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value)
    setAmount('custom')
  }

  const donationAmount =
    amount === 'custom' ? parseFloat(customAmount) : parseFloat(amount)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)

    setTimeout(() => {
      navigate(`/campaign/${id}`)
    }, 3000)
  }

  // SUCCESS SCREEN
  if (showSuccess) {
    return (
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Thank You for Your Donation!
            </h1>

            <p className="text-gray-600 mb-8">
              Your donation of ${donationAmount.toFixed(2)} to "{campaign.title}" has been processed successfully.
            </p>

            <p className="text-gray-500 mb-8">
              You will be redirected to the campaign page shortly...
            </p>

            <Link to={`/campaign/${id}`}>
              {/* Manual outline button */}
              <button className="inline-flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm py-2 px-4 rounded-md transition">
                Return to Campaign
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // DONATION PAGE
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* BACK BUTTON */}
        <Link
          to={`/campaign/${id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to campaign</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* LEFT FORM */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Make a Donation
              </h1>

              <form onSubmit={handleSubmit}>
                {/* PRESET AMOUNTS */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Select an amount
                  </label>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {["10", "25", "50", "100", "250", "500"].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`py-2 px-4 rounded-md border transition ${
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

                  {/* CUSTOM AMOUNT */}
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

                {/* ANONYMOUS */}
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

                {/* NAME */}
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

                {/* EMAIL */}
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

                {/* MESSAGE */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Leave a message (optional)
                  </label>
                  <textarea
                    rows={3}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share a few words..."
                  ></textarea>
                </div>

                {/* PAYMENT DETAILS */}
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

                  {/* MANUAL SUBMIT BUTTON */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-3 px-6 rounded-md transition"
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

          {/* RIGHT SUMMARY */}
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
}

export default Donate