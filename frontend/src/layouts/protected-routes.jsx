<<<<<<< HEAD
import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/auth-context";
import { Outlet } from "react-router-dom";
=======
import { useAuthContext } from "@/contexts/auth-context";
import { Outlet, Navigate } from "react-router-dom";
>>>>>>> 95b24a4 ([ FIXED ] fix error)

export default function ProtectedRoutes() {
  const { isAuthenticated } = useAuthContext();
  
  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/auth" />
}
