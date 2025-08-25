import { useState, useRef } from "react";
import Header from "../Home/Header";
import {
  validateEmailAndPassword,
  validateUsername,
} from "../../utils/ValidateForm";

const LoginForm = () => {
  const [isSignedIn, setSignedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  function handleToggleForm() {
    setSignedIn(!isSignedIn);
  }

  function handleFormsubmit(e) {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const username = usernameRef.current?.value;

    setErrorMessage(validateEmailAndPassword(email, password));
    setUsernameErrorMessage(validateUsername(username));
  }

  return (
    /** Standard Practice: Background Image Cover fitting */
    <div className="relative h-screen w-screen">
      <Header />
      <div className="absolute inset-0 bg-[url('/BackgroundImage.jpg')] bg-cover bg-center "></div>
      <form
        onClick={handleFormsubmit}
        className="w-3/12 absolute inset-0 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white rounded-lg "
      >
        <div className="flex flex-col items-center p-3 rounded-lg bg-black/55 backdrop-blur-xs border border-white/10 shadow-lg">
          <h1 className="text-2xl mb-4 font-bold">
            {isSignedIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignedIn && (
            <div className="m-2 w-10/12 ">
              <input
                ref={usernameRef}
                type="text"
                name="username"
                placeholder="Username"
                className="rounded-sm p-2 w-full bg-gray-200 text-black"
              />
              {usernameErrorMessage && (
                <p className="text-red-600 font-medium py-1.5 italic">
                  {usernameErrorMessage}
                </p>
              )}
            </div>
          )}
          <div className="m-2 w-10/12 ">
            <input
              ref={emailRef}
              type="email"
              placeholder="Email Address"
              name="email"
              className="rounded-sm p-2 w-full bg-gray-200 text-black"
            />
            {errorMessage?.emailError && (
              <p className="text-red-600 font-medium py-1.5 italic">
                {errorMessage?.emailError}
              </p>
            )}
          </div>
          <div className="m-2 w-10/12 ">
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              name="password"
              className="rounded-sm p-2 w-full bg-gray-200 text-black"
            />
            {errorMessage?.passwordError && (
              <p className="text-red-600 font-medium py-1.5 italic">
                {errorMessage?.passwordError}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            className="mt-3 text-white font-semibold bg-red-700  p-2 m-2 w-10/12 rounded-md cursor-pointer 
           active:bg-red-800 active:scale-95 transition-all duration-150"
          >
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
