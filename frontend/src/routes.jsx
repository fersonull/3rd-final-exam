import { lazy, Suspense } from "react";
import PublicRoutes from "./layouts/public-routes";
import AuthRoutes from "./layouts/auth-routes";
import ProtectedRoutes from "./layouts/protected-routes";
import Home from "./pages/home";
import AuthPage from "./pages/auth/auth-page";
import DashboardLayout from "./layouts/dashboard-layout";
import ProjectsLayout from "./layouts/projects-layout";
import NewTask from "./pages/tasks/new-task";
import NewMember from "./pages/members/new-member";
import NewProject from "./pages/projects/new-project";
import Calendar from "./pages/calendar";
import Profile from "./pages/profile";

const Dashboard = lazy(() => import("@/pages/dashboard/index"));
const Tasks = lazy(() => import("@/pages/tasks/index"));
const Members = lazy(() => import("@/pages/members/index"));
const Inbox = lazy(() => import("@/pages/inbox/index"));
const ProjectDashboard = lazy(() => import("@/pages/projects/dashboard"));
const Task = lazy(() => import("@/pages/tasks/task"));

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
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
  {
    // auth only
    element: <ProtectedRoutes />,
    children: [
      {
        path: "p",
        element: <ProjectsLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <ProjectDashboard />
              </Suspense>
            ),
          },
          {
            path: "new-project",
            element: <NewProject />,
          },
        ],
      },
      {
        path: "/p/:pid",
        element: <DashboardLayout />,
        children: [
          {
            path: "overview",
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
            path: "tasks/:tid",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Task />
              </Suspense>
            ),
          },
          {
            path: "calendar",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Calendar />
              </Suspense>
            ),
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
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "profile",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
        ],
      },
    ],
  },
];
