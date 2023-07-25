import React from "react";
import { PasswordInput } from "./inputs/PasswordInput";

export const LoginForm = ({ formik }) => {
  return (
    <div className="formContainer">
      <input
        className="customInput"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        id="email"
        type="email"
        placeholder="Email"
      />
      <PasswordInput formik={formik} />
    </div>
  );
};
