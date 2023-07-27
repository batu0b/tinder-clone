import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/tinderwhitebg.png";
export const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="privacy-screen flex justify-center items-center"
    >
      <motion.img
        animate={{ scale: [1, 1.2] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="h-24"
        src={logo}
        alt=""
      />
    </motion.div>
  );
};
