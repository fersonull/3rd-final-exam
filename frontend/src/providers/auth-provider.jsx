import { useEffect, useState } from "react";
import { AuthContext } from "@/contexts/auth-context";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
