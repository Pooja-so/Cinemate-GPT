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
      toast.success("You have been signed out successfully.");
    } catch (error) {
      // Step 5: Handle error if sign-out fails
      toast.error("Sign Out failed. Try again later.");

      // Step 6: Optional - navigate to a fallback error page
      navigate("/error"); // TODO: Build an error page
    }
  };

  return (
    <div className="w-screen fixed z-10 px-5 py-1 bg-white/95 flex items-center justify-between">
      <div className="flex gap-3">
        <img
          src="/logo.png"
          alt="Netflix logo"
          className="self-center h-10 w-10 border rounded-full p-1"
        />
        <span className="font-bold text-red-600 text-2xl font-sans">
          Cinemate GPT
        </span>
      </div>

      {/* Example right-side nav items */}
      <nav className="flex gap-6 items-center text-white text-sm font-medium ">
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
            <span
              className="absolute z-10 mt-1 px-4 py-0.5 rounded-4xl text-lg font-serif tracking-wider
              border border-blue-900/40 bg-blue-950/60 text-amber-300"
            >
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
