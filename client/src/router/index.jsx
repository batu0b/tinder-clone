import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomeLayout } from "../layouts/HomeLayout";
import { HomePage } from "../pages/HomePage";
import { MessagePage } from "../pages/MessagePage";
import { AnimatePresence } from "framer-motion";
import ChatPage from "../pages/ChatPage";
import { AuthLayout } from "../layouts/AuthLayout";
import { LoginPage } from "../pages/LoginPage";

export default function Router() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location.pathname} key={location.pathname}>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/messages" element={<MessagePage />} />
          <Route path="/messages/:userName" element={<ChatPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
