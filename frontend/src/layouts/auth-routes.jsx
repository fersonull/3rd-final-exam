import { Outlet } from "react-router-dom";

export default function AuthRoutes() {
  return (
    <div className="h-screen flex font-outfit">
      <Outlet />
    </div>
  );
}
