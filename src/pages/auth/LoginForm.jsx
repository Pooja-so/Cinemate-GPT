import { useState } from "react";
import Header from "../Home/Header";

const LoginForm = () => {
  const [isSignedIn, setSignedIn] = useState(true);

  function handleToggleForm() {
    setSignedIn(!isSignedIn);
  }

  return (
    /** Standard Practice: Background Image Cover fitting */
    <div className="relative h-screen w-screen">
      <Header />
      <div className="absolute inset-0 bg-[url('/BackgroundImage.jpg')] bg-cover bg-center "></div>
      <form className=" w-3/12 absolute inset-0 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white rounded-lg ">
        <div className="flex flex-col items-center p-3 rounded-lg bg-black/55 backdrop-blur-xs border border-white/10 shadow-lg">
          <h1 className="text-2xl mb-4 font-bold">
            {isSignedIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignedIn && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="rounded-sm p-2 m-2 w-10/12 bg-gray-200 text-black"
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            className="rounded-sm p-2 m-2 w-10/12 bg-gray-200 text-black"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="rounded-sm p-2 m-2 w-10/12 bg-gray-200 text-black"
          />
          {/* Button */}
          <button className="mt-6 text-white font-semibold bg-red-700  p-2 m-2 w-10/12 rounded-md cursor-pointer hover:bg-red-800 ">
            {isSignedIn ? "Sign In" : "Sign Up"}
          </button>
          {/* Ending Text */}
          <p className="mt-2 text-gray-400 text-md font-medium">
            {isSignedIn ? "New to Cinemate?" : "Already a member?"}
            <span
              onClick={handleToggleForm}
              className="cursor-pointer text-white p-2 hover:underline"
            >
              {isSignedIn ? "Sign Up Now" : "Sign In"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
