import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import {
  validateEmailAndPassword,
  validateUsername,
} from "../utils/ValidateForm";
import { toast } from "react-toastify";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignedIn, setSignedIn] = useState(true); // toggle between Sign In / Sign Up
  const [errorMessage, setErrorMessage] = useState(null); // email/password errors
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(""); // username errors

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  function resetFormFields() {
    // Reset only when not null i.e. contains some value
    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
    if (usernameRef.current) usernameRef.current.value = "";
  }

  /* Toggle between Sign In and Sign Up form */
  function handleToggleForm(e) {
    e.preventDefault();
    setSignedIn(!isSignedIn);
    resetFormFields();
  }

  /* Handle form submission (Sign In / Sign Up) */
  const handleFormsubmit = async (e) => {
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

    if (!isSignedIn) {
      // --- SIGN UP FLOW ---
      try {
        // Step 1: Create user account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user; // This user only contains uid and email 

        // Step 2: Update user profile with displayName (username)
        await updateProfile(user, { displayName: username });
        console.log("✅ Profile updated successfully.");

        // Step 3: Get latest user info (from auth.currentUser ensures updated displayName)
        const { uid, email: userEmail, displayName } = auth.currentUser; // fetching updated user info using auth.currentUser

        // Step 4: Store user in Redux
        dispatch(addUser({ uid, email: userEmail, displayName }));
        console.log("✅ User created & stored:", auth.currentUser);

        // Step 5: Navigate to browse page
        navigate("/browse");

        // Step 6: Show success toast
        toast.success("Signed Up successfully!");
      } catch (error) {
        console.error("❌ Sign Up Error:", error.code, error.message);
        toast.error("Email already exists or invalid input!");
      }
    } else {
      // --- SIGN IN FLOW ---
      try {
        // Step 1: Sign in user
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Step 2: Get user info
        const { uid, email: userEmail, displayName } = user;

        // Step 3: Store in Redux
        dispatch(addUser({ uid, email: userEmail, displayName }));
        console.log("✅ User signed in:", user);

        // Step 4: Navigate to browse page
        navigate("/browse");

        // Step 5: Show success toast
        toast.success("Signed In successfully!");
      } catch (error) {
        console.error("❌ Sign In Error:", error.code, error.message);
        toast.error("Invalid username or password");
      }
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Logo */}
      <div className="absolute z-10 py-4 w-full flex justify-center bg-black/10 backdrop-blur-xs bg-gradient-to-bl from-black rounded-b-4xl ">
        <img
          src="/NetflixLogo.png"
          alt="Cinemate GPT Logo"
          height={100}
          width={100}
        />
      </div>
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
