import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { CloseIco } from "../../assets/icons";
import { useFormik } from "formik";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import logo from "../../assets/tinder.png";
import axios from "axios";
import { setAuthToken } from "../../helpers/index";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
import { Spinner } from "../animated/Spinner";
import { loginSchema, registerSchema } from "../../validations/Schematics";

export const FormModal = ({ closeModal, modalType }) => {
  const ref = useRef();
  const errorRef = useRef(undefined);
  useOnClickOutside(ref, closeModal);

  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuth, setUser } = useAuthContext();

  const initialValues =
    modalType === "login"
      ? { email: "", password: "" }
      : { fullName: "", email: "", password: "", file: null, avatarFile: null };

  const validationSchema = modalType === "login" ? loginSchema : registerSchema;
  const onSubmit = async (values) => {
    if (modalType === "login") {
      setIsLoading(true);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}api/auth/login`,
          {
            email: values.email,
            password: values.password,
          },
          {}
        );
        const token = res.headers["x-auth-token"];
        if (token) {
          setAuthToken(token);
          setIsAuth(true);
          setUser(res.data);
        }
      } catch (err) {
        console.log(err.response.data);
        errorRef.current = err.response.data;
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("file", values.file);
      formData.append("avatarFile", values.avatarFile);

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}api/auth/register`,
          formData
        );
        const token = res.headers["x-auth-token"];
        if (token) {
          setAuthToken(token);
          setIsAuth(true);
          setUser(res.data);
        }
      } catch (err) {
        console.log(err.response.data);
        errorRef.current = err.response.data;
      } finally {
        setIsLoading(false);
      }
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
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
        className=" bg-[#111418] border border-gray-700 p-8 pt-8 relative text-gray-100 w-96 rounded-md shadow-md min-h-3/4 max-h-full flex flex-col gap-5"
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
          <span className="flex flex-col gap-2">
            {errorRef.current && (
              <span className="text-red-500">{errorRef.current}</span>
            )}
            <button
              disabled={isLoading}
              className="bg-gradient-to-br  h-14 font-semibold text-xl px-12 shadow-md py-3 rounded-md to-[#ff796a] hover:brightness-125 via-[#fa4952] from-[#ff2b64]"
              type="submit"
            >
              {!isLoading ? (
                modalType === "login" ? (
                  "Log In"
                ) : (
                  "Create Account"
                )
              ) : (
                <Spinner />
              )}
            </button>{" "}
          </span>
        </form>
      </motion.div>
    </motion.div>
  );
};
