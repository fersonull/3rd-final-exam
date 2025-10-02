import { createContext, useContext } from "react";

export const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
<<<<<<< HEAD
    login: () => {},
    logout: () => {},
=======
>>>>>>> 95b24a4 ([ FIXED ] fix error)
});


export const useAuthContext = () => useContext(AuthContext);