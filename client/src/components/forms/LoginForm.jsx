import React from "react";
import { PasswordInput } from "./inputs/PasswordInput";
import { TextInput } from "./inputs/TextInput";

export const LoginForm = ({ formik }) => {
  return (
    <div className="formContainer">
      <TextInput formik={formik} name={"email"} placeholder={"Email"} />
      <PasswordInput formik={formik} />
    </div>
  );
};
