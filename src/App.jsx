import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Todo from "./components/Todo";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UserProfile from "./components/UserProfile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ManageUsers from "./components/ManageUsers";

function App() {
  const Layout = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userId = user.uid;
          // ...
        } else {
          // User is signed out
          navigate("/login");
        }
      });
    }, []);

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
        {
          path: "/manageusers",
          element: <ManageUsers />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
