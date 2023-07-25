import React, { useState } from "react";
import logo from "../assets/tinderwhite.png";
import { FormModal } from "../components/forms/FormModal";
import { AnimatePresence } from "framer-motion";
export const LoginPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleModal = (modal) => {
    setModalType(modal);
    setShowModal(true);
  };
  return (
    <div className="flex relative items-center select-none justify-center h-screen before:bg-gradient-to-b before:from-black bg-cover bg-no-repeat  before:via-black/40 before:to-black/40 before:top-0 before:left-0 before:bottom-0  before:absolute before:right-0 bg-[url('../assets/tinderBg.webp')]">
      <nav className="h-20 p-4 flex items-center justify-between absolute top-0 w-full">
        <img className="h-8 " src={logo} alt="" />
        <button
          onClick={() => handleModal("login")}
          className="bg-white h-10 text-xl flex items-center justify-center font-bold rounded-full px-7 "
        >
          Log in
        </button>
      </nav>
      <div className="z-50 flex-col flex justify-center gap-12 items-center text-white ">
        <div className="text-9xl flex max-md:text-6xl">
          <h1 className="  font-bold">Swipe Right</h1>
          <span>®</span>
        </div>
        <button
          onClick={() => handleModal("register")}
          className="bg-gradient-to-br font-semibold text-xl px-12 shadow-md py-3 rounded-full to-[#ff796a] hover:brightness-125 via-[#fa4952] from-[#ff2b64]"
        >
          Create account
        </button>
      </div>
      <AnimatePresence mode="wait" key={"modal"}>
        {showModal && (
          <FormModal
            modalType={modalType}
            closeModal={() => {
              setShowModal(false);
              setModalType(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
