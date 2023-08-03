import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  isAuth: null,
  setIsAuth: () => {},
  checkToken: async () => {},
  logOut: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
