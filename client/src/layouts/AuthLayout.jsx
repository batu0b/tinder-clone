import React from "react";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  const { isAuth } = useAuthContext();
  if (isAuth === null) {
    return <div>loading</div>;
  }
  return isAuth ? <Navigate to={"/"} /> : <Outlet />;
};
