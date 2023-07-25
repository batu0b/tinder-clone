import React, { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  isAuth: null,
  setIsAuth: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
