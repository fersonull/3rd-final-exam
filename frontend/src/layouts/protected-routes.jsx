import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const { token } = useContext(AuthContext);

  console.log(token);

  if (token) {
    <Outlet />;
  }

  return <div>Unauthorized.</div>;
}
