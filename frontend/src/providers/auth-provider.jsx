import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { useFetch } from "@/hooks/useFetch";

export default function AuthProvider({ children }) {
  const { refetch } = useFetch("/session");

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
<<<<<<< HEAD
    return storedUser ? JSON.parse(storedUser) : null;
=======
    return storedUser && storedUser != "undefined"
      ? JSON.parse(storedUser)
      : null;
>>>>>>> 95b24a4 ([ FIXED ] fix error)
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!token);
<<<<<<< HEAD

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
=======

  const fetchSession = useCallback(async () => {
    const res = await refetch();

    console.log(res);

    if (!res || res?.error) {
      localStorage.setItem("token", null);
      localStorage.setItem("user", null);

      setIsAuthenticated(false);

      return;
    }

    localStorage.setItem("token", res?.token);
    localStorage.setItem("user", JSON.stringify(res?.user));

    setToken(res?.token);
    setUser(res?.user);
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    fetchSession();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, setUser, setToken }}
    >
>>>>>>> 95b24a4 ([ FIXED ] fix error)
      {children}
    </AuthContext.Provider>
  );
}
