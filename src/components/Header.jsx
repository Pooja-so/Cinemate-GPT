import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const Header = () => {
  const [showUsername, setShowUsername] = useState(false);
  const navigate = useNavigate();
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Sign Out Error:  ", error);
      });
  }
  return (
    <div className="w-5/6 mx-auto mt-4 px-5 py-2 bg-zinc-300 backdrop-blur-lg border border-white/10 shadow-lg rounded-2xl flex items-center justify-between">
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
            className="bg-white rounded-full cursor-pointer"
            height={10}
            width={30}
            onMouseOver={() => setShowUsername(true)}
            onMouseOut={() => setShowUsername(false)}
          />
          {showUsername && (
            <span className="absolute z-10 mt-1 bg-blue-400 px-4 py-0.5 rounded-4xl border border-blue-600 backdrop-blur-xl">
              Pooja
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
