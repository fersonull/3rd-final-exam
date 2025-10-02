import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { useFetch } from "@/hooks/useFetch";

export default function AuthProvider({ children }) {
  const { refetch } = useFetch("/session");

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const fetchSession = useCallback(async () => {
    const res = await refetch();

    if (!res || res?.error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      return;
    }

    // Save to storage
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    // Update state
    setToken(res.token);
    setUser(res.user);
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    fetchSession();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, setUser, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
