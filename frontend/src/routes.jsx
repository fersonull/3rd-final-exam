import { lazy, Suspense } from "react";
import PublicRoutes from "./layouts/public-routes";
import AuthRoutes from "./layouts/auth-routes";
import ProtectedRoutes from "./layouts/protected-routes";
import Home from "./pages/home";
import AuthPage from "./pages/auth/auth-page";
import DashboardLayout from "./layouts/dashboard-layout";
import NewTask from "./pages/tasks/new-task";
import NewMember from "./pages/members/new-member";
import TestParam from "./pages/test-param";

const Dashboard = lazy(() => import("@/pages/dashboard/index"));
const Tasks = lazy(() => import("@/pages/tasks/index"));
const Members = lazy(() => import("@/pages/members/index"));
const Inbox = lazy(() => import("@/pages/inbox/index"));

export const routes = [
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/p/:pid",
        element: <TestParam />,
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
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "tasks",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Tasks />
              </Suspense>
            ),
          },
          {
            path: "tasks/new-task",
            element: <NewTask />,
          },
          {
            path: "inbox",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Inbox />
              </Suspense>
            ),
          },
          {
            path: "members",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Members />
              </Suspense>
            ),
          },
          {
            path: "members/new-member",
            element: <NewMember />,
          },
        ],
      },
    ],
  },
];
