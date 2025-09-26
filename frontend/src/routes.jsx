import { lazy, Suspense } from "react";
import PublicRoutes from "./layouts/public-routes";
import AuthRoutes from "./layouts/auth-routes";
import ProtectedRoutes from "./layouts/protected-routes";
import Home from "./pages/home";
import AuthPage from "./pages/auth/auth-page";
import Index from "./pages/dashboard";

export const routes = [
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    element: <AuthRoutes />,
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <Index />,
      },
    ],
  },
];
