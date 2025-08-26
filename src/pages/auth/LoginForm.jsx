import { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import Header from "../../components/Header";
import {
  validateEmailAndPassword,
  validateUsername,
} from "../../utils/ValidateForm";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [isSignedIn, setSignedIn] = useState(true); // toggle between Sign In / Sign Up
  const [errorMessage, setErrorMessage] = useState(null); // email/password errors
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(""); // username errors

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  function resetFormFields(){
    emailRef.current.value = "";
    passwordRef.current.value = "";
    usernameRef.current.value = "";
  }

  /* Toggle between Sign In and Sign Up form */
  function handleToggleForm(e) {
    e.preventDefault();
    setSignedIn(!isSignedIn);
    resetFormFields();
  }

  /* Handle form submission (Sign In / Sign Up) */
  function handleFormsubmit(e) {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const username = usernameRef.current?.value;

    // Validate inputs BEFORE setting state
    const emailPassValidation = validateEmailAndPassword(email, password);
    const usernameValidation = validateUsername(username);

    // Update state so error messages display in UI (Next Render: After component render)
    setErrorMessage(emailPassValidation);
    setUsernameErrorMessage(usernameValidation);

    // Stop if validation fails
    const hasEmailOrPasswordError =
      emailPassValidation?.emailError || emailPassValidation?.passwordError;

    const hasUsernameError = !isSignedIn && usernameValidation;

    if (hasEmailOrPasswordError || hasUsernameError) {
      console.log("Validation failed:", emailPassValidation);

      if (hasUsernameError) {
        console.log("Validation failed:", usernameValidation);
      }

      return;
    }

    // --- Firebase Authentication ---
    if (!isSignedIn) {
      // Sign Up: Create user account
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User created:", user);
          resetFormFields();
        })
        .catch((error) => {
          console.log("Sign Up Error:", error.code, error.message);
          toast.error("Email id already exist!");
        });
    } else {
      // Sign In logic here
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User Signed in: ", user);
          emailRef.current.value = "";
          passwordRef.current.value = "";
        })
        .catch((error) => {
          console.log("Sign Up Error:", error.code, error.message);
          toast.error("Username or Password is invalid");
        });
    }
  }

  return (
    <div className="relative h-screen w-screen">
      {/* Header */}
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/BackgroundImage.jpg')] bg-cover bg-center "></div>

      {/* Auth Form */}
      <form
        onSubmit={handleFormsubmit} // ✅ Correct event: only triggers on submit
        className="w-3/12 absolute inset-0 left-3/8 top-1/8 text-white rounded-lg "
      >
        <div className="flex flex-col items-center p-3 rounded-lg bg-black/55 backdrop-blur-xs border border-white/10 shadow-lg">
          {/* Form Heading */}
          <h1 className="text-2xl mb-4 font-bold">
            {isSignedIn ? "Sign In" : "Sign Up"}
          </h1>

          {/* Username Field (only for Sign Up) */}
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
                <p className="text-red-500 font-medium py-1.5 italic">
                  {usernameErrorMessage}
                </p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div className="m-2 w-10/12 ">
            <input
              ref={emailRef}
              type="email"
              placeholder="Email Address"
              name="email"
              className="rounded-sm p-2 w-full bg-gray-200 text-black"
            />
            {errorMessage?.emailError && (
              <p className="text-red-500 font-medium py-1.5 italic">
                {errorMessage?.emailError}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="m-2 w-10/12 ">
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              name="password"
              className="rounded-sm p-2 w-full bg-gray-200 text-black"
            />
            {errorMessage?.passwordError && (
              <p className="text-red-500 font-medium py-1.5 italic">
                {errorMessage?.passwordError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit" // ✅ ensures handleFormsubmit only fires on submit
            className="mt-3 text-white font-semibold bg-red-700  p-2 m-2 w-10/12 rounded-md cursor-pointer 
           active:bg-red-800 active:scale-95 transition-all duration-150"
          >
            {isSignedIn ? "Sign In" : "Sign Up"}
          </button>

          {/* Footer Text */}
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
