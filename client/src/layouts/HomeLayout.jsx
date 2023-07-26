import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import { Loader } from "../components/animated/Loader";
import { AnimatePresence } from "framer-motion";

export const HomeLayout = () => {
  const { isAuth } = useAuthContext();
  if (isAuth === null) {
    return (
      <AnimatePresence>
        <Loader />
      </AnimatePresence>
    );
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
