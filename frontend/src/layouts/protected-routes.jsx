import { useAuthContext } from "@/contexts/auth-context";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/auth" />;
}
