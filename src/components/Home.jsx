import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../store/userSlice";
import LoginForm from "./LoginForm.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // attach the listener
    onAuthStateChanged(auth, (user) => {
      console.log("🔥 onAuthStateChanged fired:");
      if (user) {
        const { uid, email, displayName } = user;
        console.log("AUth User: ", uid, ", ", email, ", ", displayName);
        dispatch(addUser({ uid, email, displayName }));
        console.log("Inside sign Up onAUthChanged User: ", user);
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    console.log("Home mounted");

    return () => {
      console.log("Home Unmounted.");
    };
  });

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Home;

/* How onAuthStateChanged() works
-->The Firebase function onAuthStateChanged(auth, callback) does two things:
  1. Sets up an auth state listener (so your callback runs whenever the user logs in, 
    logs out, or the app restarts).
  2. Returns a cleanup function (a function that, when called, removes that listener).
    That cleanup function is what we usually name unsubscribe.

*/
