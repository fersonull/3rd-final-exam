import { lazy, Suspense } from "react";
import PublicRoutes from "./layouts/public-routes";

const Home = lazy(() => import("./pages/home"));

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
];
