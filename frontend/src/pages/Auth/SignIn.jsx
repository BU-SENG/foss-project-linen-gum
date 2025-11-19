import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../api"; // centralized API function
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/auth/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await toast.promise(loginUser({ email, password }), {
        loading: "Signing in...",
        success: "Login successful!",
        error: (err) => err.message || "Login failed",
      });

      // Dispatch Redux state
      dispatch(loginSuccess(user));

      // Redirect based on role
      if (user.role === "creator") {
        navigate("/creator/home");
      } else if (user.role === "admin") {
        navigate("/admin/home");
      }
    } catch (err) {
      console.error(err);
      // Handle email not verified
      if (err.needVerification) {
        toast.error("Please verify your email first.");
        navigate("/verify-email", { state: { email } });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-start items-center px-4 py-12">
      {/* logo container */}
      <div className="inset-x-0 top-8 mb-3 pt-6 z-50">
        <div className="flex items-center gap-2 justify-center">
          <svg
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a58ff"
            strokeWidth="1.8"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="text-3xl sm:text-2xl font-semibold text-blue-600">
            Aidly
          </span>
        </div>
      </div>

      {/* Welcome text */}
      <div className="flex flex-col items-center gap-3 mt-8">
        <span className="text-2xl sm:text-3xl font-bold text-black">
          Welcome Back
        </span>
        <span className="text-gray-500 font-light">
          Sign in to your account to continue
        </span>
      </div>

      {/* Form card */}
      <div className="w-full min-h-[500px] max-w-md mt-8 bg-white p-10 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black shadow-sm"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Sign up link */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
