import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsAuth(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        setIsAuth: setIsAuth,
        setUser: setUser,
        user: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
