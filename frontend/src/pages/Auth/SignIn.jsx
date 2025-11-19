import React from "react";

const SignIn = () => {
  return <div className="min-h-screen bg-gray-100 flex flex-col justify-start items-center px-4 py-12">

            {/* logo container */}
            <div className="inset-x-0 top-8 mb-3 pt-6 z-50">
                <div className="flex items-center gap-2 justify-center">
                  {/* heart icon */}
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#1a58ff" strokeWidth="1.8">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                            
                  {/* logo text */}
                  <span className="text-3xl sm:text-2xl font-semibold text-blue-600">Aidly</span>
                </div>
             </div>

            <div className="flex flex-col items-center gap-3 mt-8">
              {/* welcome */}
              <span className="text-2xl  sm:text-3xl font-bold text-black">Welcome Back</span>

              {/*call to action */}
              <span className="text-gray-500 font-light-500">Sign in to your account to continue</span>
              
            </div>   

            <div className="w-full min-h-[500px] max-w-md mt-8 bg-white p-10 rounded-lg shadow-md">
              <div>
              {/* Email Address Input */}
              <form action="">
                <div className="mb-6">
                  <label className="block text-gray-600 font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black shadow-sm"
                      />
                </div>
                {/* Password Input */}
                  <div className="mb-6">
                    <label className="block text-gray-600 font-medium mb-2">Password</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black shadow-sm"
                      />
                  </div>

                  <div>
                    <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                      Sign In
                    </button>
                  </div>
                </form>

                  <div>
                    <p className="mt-4 text-center text-gray-600">
                      Don't have an account?{' '}
                      <a href="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                      </a>
                    </p>
                  </div>
              </div>


            </div>   
            
                    

  </div>;
};

export default SignIn;
