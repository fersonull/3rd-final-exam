import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/auth-context";
import { Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const { isAuthenticated } = useAuthContext();
  
  if (isAuthenticated) {
    return <Outlet />;
  }

  return <h1>Unauthorized.</h1>
}
