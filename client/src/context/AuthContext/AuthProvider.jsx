import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getAuthToken, removeAuhtToken } from "../../helpers";
import axios from "axios";

export default function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const [user, setUser] = useState(null);
  const token = getAuthToken();

  const checkToken = async (token) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/me",
        {},
        {
          headers: {
            "x-auth-token": `${token}`,
          },
        }
      );
      setUser(res.data);
      setTimeout(() => {
        setIsAuth(true);
      }, 1000);
    } catch (err) {
      console.log(err.response.data);
      setTimeout(() => {
        setIsAuth(false);
      }, 1000);
    }
  };

  const logOut = () => {
    removeAuhtToken();
    setIsAuth(false);
  };

  useEffect(() => {
    if (token) {
      checkToken(token);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        setIsAuth: setIsAuth,
        setUser: setUser,
        user: user,
        checkToken: checkToken,
        logOut: logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
