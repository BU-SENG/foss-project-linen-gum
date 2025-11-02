import React, { useState } from 'react';
export default function AidlySignup() {
  // to track which role is selected (donor or creator)
  const [selectedRole, setSelectedRole] = useState('donor');
  // to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // add your signup logic here
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
       {/* logo section */}
      <div className="inset-x-0 top-8 mb-8 z-50">
        <div className="flex items-center gap-3 justify-center">
          {/* heart icon */}
          <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="#4F7FFF" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {/* logo text */}
          <span className="text-3xl sm:text-4xl font-semibold text-blue-600">Aidly</span>
        </div>
      </div>


      <div className="w-full max-w-2xl mt-16">
        {/* page header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Join Aidly</h1>
          <p className="text-gray-500 text-base sm:text-lg">Create an account to start donating or fundraising</p>
        </div>

        {/* form card */}
        <div className="bg-white rounded-lg shadow p-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            {/* role selection */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-gray-700 font-medium mb-4">I want to join as a:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* donor role button */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('donor')}
                  className={`p-6 rounded-lg border-2 cursor-pointer ${
                    selectedRole === 'donor' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {/* donor icon container */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                      selectedRole === 'donor' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {/* user icon heree */}
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Donor</div>
                    <div className="text-sm text-gray-500">Support campaigns</div>
                  </div>
                </button>

                {/* Campaign Creator Role Button */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('creator')}
                  className={`p-6 rounded-lg border-2 cursor-pointer ${
                    selectedRole === 'creator' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {/* Creator Icon Container */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                      selectedRole === 'creator' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {/* Briefcase Icon */}
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Campaign Creator</div>
                    <div className="text-sm text-gray-500">Start fundraising</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Full Name Input Field */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black"
              />
            </div>

            {/* Email Input Field */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black"
              />
            </div>

            {/* password input field with visibility toggle */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black pr-12"
                />
                {/* toggle password visibility button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? (
                    // eye with slash icon (password visible)
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    // regular eye icon (password hidden)
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* submit button */}
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-base sm:text-lg mb-4 hover:bg-blue-700 cursor-pointer"
            >
              Create Account
            </button>

            {/* sign in link */}
            <div className="text-center text-sm sm:text-base">
              <span className="text-gray-600">Already have an account? </span>
              <a href="#" className="text-blue-600 font-semibold hover:underline cursor-pointer">Sign in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}