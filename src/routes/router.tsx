import Register from "../pages/Register";
import Login from "../pages/Login";
import LoginLayout from "../layouts/LoginOrRegister";
import { AuthProvider } from "../auth/AuthContext";
import MainLayout from "../layouts/MainLayour";
import Users from "../pages/Users";
import { Navigate } from "react-router-dom";

const routerConfigs = [
  {
    element: <AuthProvider />,
    children: [
      {
        element: <LoginLayout />,
        children: [
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            index: true,
            element: <Navigate to="/users" replace />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/test",
            element: <div>test</div>,
          },
        ],
      },

      {
        path: "*",
        element: <div>Not match any route</div>,
      },
    ],
  },
];

export default routerConfigs;
