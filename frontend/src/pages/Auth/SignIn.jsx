import React from "react";

const SignIn = () => {

  // ====== STATE ======
  const [verificationCode, setVerificationCode] = React.useState("");
  const [showCodeScreen, setShowCodeScreen] = React.useState(false);


  // ====== GENERATE 6-CHAR VERIFICATION CODE ======
  const generateVerificationCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // ====== HANDLE LOGIN SUBMIT ======
  const handleSubmit = (e) => {
    e.preventDefault();

    // (School-demo fake login)
    const newCode = generateVerificationCode();

    setVerificationCode(newCode);
    setShowCodeScreen(true);
  };

  const handleGoBack = () => {
  setShowCodeScreen(false);
};


  // ============================================
  // IF USER IS ON VERIFICATION SCREEN
  // ============================================
  if (showCodeScreen) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-md text-center">

          <h2 className="text-2xl sm:text-2xl text-black font-bold mb-4 ">Enter Verification Code</h2>

          <p className="font-semibold text-lg mb-4 text-black">
            Your Code: <span className="text-blue-600">{verificationCode}</span>
          </p>

          <input
            type="text"
            placeholder="Enter code here"
            className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg mb-4"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Verify Code
          </button>

          <button
            onClick={handleGoBack}
            className="w-full mt-4 bg-gray-300 text-black py-3 rounded-lg hover:bg-gray-400"
          >
  Go Back
</button>

        </div>
      </div>
    );
  }


  // ============================================
  // NORMAL LOGIN SCREEN
  // ============================================
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-start items-center px-4 py-12">

      {/* logo container */}
      <div className="inset-x-0 top-8 mb-3 pt-6 z-50">
        <div className="flex items-center gap-2 justify-center">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#1a58ff" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="text-3xl sm:text-2xl font-semibold text-blue-600">Aidly</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 mt-8">
        <span className="text-2xl sm:text-3xl font-bold text-black">Welcome Back</span>
        <span className="text-gray-500">Sign in to your account to continue</span>
      </div>

      <div className="w-full min-h-[500px] max-w-md mt-8 bg-white p-10 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>

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
