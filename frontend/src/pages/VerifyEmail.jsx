import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const location = useLocation();
  const navigate = useNavigate();

  // Get email from state or localStorage
  useEffect(() => {
    const stateEmail = location.state?.email;
    const storedEmail = localStorage.getItem("pendingEmail");

    if (stateEmail) {
      setEmail(stateEmail);
    } else if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate("/signin", { replace: true });
    }
  }, [location.state, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    // verify logic
  };

  return (
    <div className="w-full max-w-md mx-auto m-16">
      <div className="bg-white py-8 px-6 shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-4">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 mb-6">
          We sent a verification code to <br />
          <span className="font-medium">{email}</span> <br />
          If you didn't receive it, check your spam folder or click the button
          below to resend.
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Verification Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g. 123456"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white 
            ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </div>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
