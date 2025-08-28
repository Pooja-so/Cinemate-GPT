import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../store/userSlice.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import Browse from "../components/Browse.jsx";
import LoginForm from "../components/LoginForm.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const { user, ready } = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("🔥 onAuthStateChanged fired:");
      if (firebaseUser) {
        console.log("Currently logged in...")
        const { uid, email, displayName } = firebaseUser;
        dispatch(addUser({ uid, email, displayName }));
      } else {
        console.log("Logged out...")
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center">
        Checking session…
      </div>
    );
  }

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: user ? <Navigate to="/browse" replace /> : <LoginForm />,
    },
    {
      path: "/browse",
      element: user ? <Browse /> : <Navigate to="/" replace />,
    },
    // fallback for wrong routes
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  //   Return entire application Route setup
  return <RouterProvider router={appRouter} />;
};

export default Home;

/* How onAuthStateChanged() works
-->The Firebase function onAuthStateChanged(auth, callback) does two things:
  1. Sets up an auth state listener (so your callback runs whenever the user logs in, 
    logs out, or the app restarts).
  2. Returns a cleanup function (a function that, when called, removes that listener).
    That cleanup function is what we usually name unsubscribe.
*/
