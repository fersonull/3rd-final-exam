import { createContext, useContext } from "react";

export const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});


export const useAuthContext = () => useContext(AuthContext);