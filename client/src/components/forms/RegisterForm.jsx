import React from "react";
import { OpenEyeIco } from "../../assets/icons";
import { PasswordInput } from "./inputs/PasswordInput";

export const RegisterForm = ({ formik }) => {
  return (
    <div className="formContainer">
      <input
        className="customInput"
        name="fullName"
        onChange={formik.handleChange}
        value={formik.values.fullname}
        id="fullname"
        type="text"
        placeholder="Full Name"
      />
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
