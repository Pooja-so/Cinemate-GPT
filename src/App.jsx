import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./store/appStore.js";
import Browse from "./components/Browse.jsx";
import LoginForm from "./components/LoginForm.jsx";
import { ToastContainer } from "react-toastify";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <LoginForm/>,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
  return (
    <div>
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
      </Provider>
      {/* Toast Container should be at root level */}
      <ToastContainer position="bottom-center" autoClose={3000} theme="dark" />
    </div>
  );
};

export default App;
