import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import { Suspense } from "react";
import Home from "./pages/home";
import { routes } from "./routes";

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

export default function App() {
  return (
    <Router>
      <Suspense>
        <AppRoutes />
      </Suspense>
    </Router>
  );
}
