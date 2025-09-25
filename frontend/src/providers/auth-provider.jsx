import { useEffect, useState } from "react";
import { AuthContext } from "@/contexts/auth-context";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log(user);
    console.log(token);
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
