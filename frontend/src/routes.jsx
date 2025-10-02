import { lazy, Suspense } from "react";
import PublicRoutes from "./layouts/public-routes";
import AuthRoutes from "./layouts/auth-routes";
import ProtectedRoutes from "./layouts/protected-routes";
import Home from "./pages/home";
import AuthPage from "./pages/auth/auth-page";
import DashboardLayout from "./layouts/dashboard-layout";
import Inbox from "./pages/dashboard/inbox";

const Index = lazy(() => import("@/pages/dashboard/index"));

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
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Index />
              </Suspense>
            ),
          },
          {
            path: "/dashboard/inbox",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Inbox />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];
