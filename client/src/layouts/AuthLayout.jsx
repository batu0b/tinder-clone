import React from "react";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../components/animated/Loader";
import { AnimatePresence } from "framer-motion";

export const AuthLayout = () => {
  const { isAuth } = useAuthContext();
  console.log(isAuth);
  if (isAuth === null) {
    return (
      <AnimatePresence>
        <Loader />
      </AnimatePresence>
    );
  }
  return isAuth ? <Navigate to={"/"} /> : <Outlet />;
};
