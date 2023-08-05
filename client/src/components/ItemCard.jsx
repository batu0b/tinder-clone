import React, { useState } from "react";
import { InfoIco, UpIco } from "../assets/icons";
import { AnimatePresence, motion } from "framer-motion";

export const ItemCard = ({ item }) => {
  const [show, setShow] = useState(false);
  const imgUrl = `${process.env.REACT_APP_API_URL}imgs/${item.file}`;
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(239, 74, 117, 0.1), rgba(0, 0, 0, 1)) , url(${imgUrl})`,
      }}
      className={` rounded-md shadow-lg overflow-hidden border-2 shadow-black/40 p-2 !bg-center !bg-cover !bg-no-repeat relative h-96 w-96`}
    >
      <h3 className="absolute text-xl text-red-50 bottom-4 left-4">
        {item.fullName}
      </h3>
      {show ? null : (
        <button
          className="text-gray-200 pressable absolute bottom-4 right-4"
          onClick={() => setShow(true)}
        >
          <InfoIco className="w-8 h-8" />
        </button>
      )}

      <AnimatePresence>
        {show ? (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0, transition: { duration: 0.5, ease: "circOut" } }}
            exit={{ y: "100%", transition: { duration: 0.5, ease: "circIn" } }}
            key={"show-details"}
            className="top-0 right-0 rounded-md left-0 bottom-0 absolute bg-black/70"
          >
            <button
              onClick={() => setShow(false)}
              className="absolute pressable border  items-center rounded-full flex gap-1  p-1 bg-gray-200 text-black top-4 right-4"
            >
              <UpIco className="w-4 h-4 rotate-180" />
            </button>
            {/* FIXME fix the svg error */}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
