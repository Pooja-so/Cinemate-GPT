import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "../pages/auth/LoginForm";
import Browse from "../pages/subscription/Browse";
import { ToastContainer } from "react-toastify";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <LoginForm />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
      {/* Toast Container should be at root level */}
      <ToastContainer position="bottom-center" autoClose={3000} theme="dark"/>
    </div>
  );
};

export default Body;
