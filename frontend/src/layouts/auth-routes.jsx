import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/auth-context";

export default function AuthRoutes() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="h-screen flex font-outfit">
      <Outlet />
    </div>
  );
}
