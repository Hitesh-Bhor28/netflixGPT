import React, { useState } from 'react';
import Header from './Header';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const toogleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div className="relative">
      <Header />
      <img className='w-screen h-screen bg-[linear-gradient(to_bottom,#4f1111_0%,#3d0000_16.7%,#280505_40%,#1b0707_100%)]' src="https://assets.nflxext.com/ffe/siteui/vlv3/9ba9f0e2-b246-47f4-bd1f-3e84c23a5db8/web/IN-en-20251020-TRIFECTA-perspective_d6da84e9-6145-4b1e-bb51-e402c966a045_large.jpg" alt="bg_img" />
      <hr className="absolute top-[13%] left-0 w-full border-t-2 border-white opacity-20" />

      {/* Centered login form */}
      <div className="absolute inset-0 flex justify-center items-center">
        <form className="bg-[rgba(0,0,0,0.65)] p-12 rounded-md flex flex-col items-start shadow-lg">
          <h2 className="text-2xl text-white mb-6 font-semibold">Sign {isSignInForm ? "In" : "Up"}</h2>
          {!isSignInForm && <input
            type="text"
            placeholder="Enter Name"
            className="p-3 mb-4 w-72 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />}
          <input
            type="text"
            placeholder="Enter Email"
            className="p-3 mb-4 w-72 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="p-3 mb-6 w-72 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded w-72 transition-colors"
          >
            Sign {isSignInForm ? "In" : "Up"}
          </button>
          <p className='text-white mt-4 cursor-pointer' onClick={toogleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up now" : "Already to Netflix? Log In now"}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
