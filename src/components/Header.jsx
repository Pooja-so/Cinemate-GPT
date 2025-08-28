import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../store/userSlice";
import { toast } from "react-toastify";

const Header = () => {
  const [showUsername, setShowUsername] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      // Step 1: Attempt to sign out the user
      await signOut(auth);
      // Step 2: Clear user from Redux store
      dispatch(removeUser());
      // Step 3: Navigate to home page
      navigate("/");
      // Step 4: Show success message
      console.log("✅ Signed out successfully.");
      toast.success("You have been signed out successfully.");
    } catch (error) {
      // Step 5: Handle error if sign-out fails
      console.error("❌ Sign Out Error:", error);
      toast.error("Sign Out failed. Try again later.");

      // Step 6: Optional - navigate to a fallback error page
      navigate("/error"); // TODO: Build an error page
    }
  };

  return (
    <div className="w-screen absolute px-5 py-2 bg-black/10 backdrop-blur-xs bg-gradient-to-br from-black flex items-center justify-between">
      <img src="/NetflixLogo.png" alt="Netflix logo" className="h-6 w-auto" />

      {/* Example right-side nav items */}
      <nav className="flex gap-6 items-center text-white text-sm font-medium ">
        <a href="#browse" className="hover:text-red-500 transition">
          Browse
        </a>
        <div>
          <img
            src="/UserIcon.png"
            alt="User icon"
            className="bg-white rounded-full cursor-pointer border"
            height={10}
            width={30}
            onMouseOver={() => setShowUsername(true)}
            onMouseOut={() => setShowUsername(false)}
          />
          {showUsername && (
            <span className="absolute z-10 mt-1 bg-blue-400 px-4 py-0.5 rounded-4xl border border-blue-600 backdrop-blur-xl">
              {user?.displayName}
            </span>
          )}
        </div>

        <button
          className=" text-white font-semibold bg-red-700 px-3 py-1 rounded-2xl cursor-pointer 
           active:bg-red-800 active:scale-95 transition-all duration-150"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default Header;
