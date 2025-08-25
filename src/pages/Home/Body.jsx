import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import Browse from "../subscription/Browse";

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
    </div>
  );
};

export default Body;
