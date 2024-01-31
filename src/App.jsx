import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Todo from "./components/Todo";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UserProfile from "./components/UserProfile";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <NavBar />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Todo />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/passswordreset",
          element: <ForgotPassword />,
        },
        {
          path: "/profile",
          element: <UserProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
