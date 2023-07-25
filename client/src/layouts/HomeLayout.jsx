import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useAuthContext } from "../context/AuthContext/AuthContext";

export const HomeLayout = () => {
  const { isAuth } = useAuthContext();
  if (isAuth === null) {
    return <div>loader</div>;
  }
  return isAuth ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};
