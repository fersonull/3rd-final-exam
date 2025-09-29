import { useEffect, useState } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { useFetch } from "@/hooks/useFetch";

export default function AuthProvider({ children }) {
  const { refetch } = useFetch("/session");

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!token);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await refetch();

      if (!res) {
        localStorage.setItem("token", null);
        localStorage.setItem("user", null);

        
      setIsAuthenticated(false);

        return;
      };

      // save to storage
      localStorage.setItem("token", res?.token);
      localStorage.setItem("user", JSON.stringify(res?.user));

      // update state
      setToken(res?.token);
      setUser(res?.user);
      setIsAuthenticated(true);
    };

    fetchSession();
}, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
