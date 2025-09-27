import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const { token } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    }
  }, [token])
  

  if (token) {
    return <Outlet />;
  }

  return <h1>Unauthorized.</h1>
}
