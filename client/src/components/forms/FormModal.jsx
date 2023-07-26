import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { CloseIco } from "../../assets/icons";
import { useFormik } from "formik";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import logo from "../../assets/tinder.png";
export const FormModal = ({ closeModal, modalType }) => {
  const ref = useRef();
  useOnClickOutside(ref, closeModal);
  const initialValues =
    modalType === "login"
      ? { email: "", password: "" }
      : { fullName: "", email: "", password: "" };
  const onSubmit = (values) => {
    if (modalType === "login") {
      console.log(values);
    } else {
      console.log(values);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
  });

  return (
    <motion.div
      key={"modalContainer"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease: "backIn" } }}
      exit={{ opacity: 0 }}
      className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/40 z-[99]"
    >
      <motion.div
        key={"modalContent"}
        ref={ref}
        className=" bg-[#111418] border border-gray-700 p-4 pt-8 relative text-gray-100 w-96 rounded-md shadow-md h-3/4 flex flex-col gap-5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.5, ease: "circIn" },
        }}
        exit={{
          scale: 0,
          opacity: 0,
          transition: { duration: 0.5, ease: "circOut" },
        }}
      >
        <button onClick={closeModal}>
          <CloseIco className="w-8 h-8 cursor-pointer text-gray-400 absolute right-3 top-2" />
        </button>
        <div className="flex flex-col justify-center items-center gap-4">
          <img className="w-9  " src={logo} alt="" />
          <h1 className="text-center text-4xl font-extrabold">
            {modalType === "login" ? "Get Started" : "Create Account"}
          </h1>
        </div>
        <form
          className="flex h-full flex-col gap-12  pb-12 justify-start"
          onSubmit={formik.handleSubmit}
        >
          {modalType === "login" ? (
            <LoginForm formik={formik} />
          ) : (
            <RegisterForm formik={formik} />
          )}
          <button
            className="bg-gradient-to-br font-semibold text-xl px-12 shadow-md py-3 rounded-md to-[#ff796a] hover:brightness-125 via-[#fa4952] from-[#ff2b64]"
            type="submit"
          >
            {modalType === "login" ? "Log In" : "Create Account"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};
