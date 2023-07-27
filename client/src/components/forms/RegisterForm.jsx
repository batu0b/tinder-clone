import React from "react";
import { PasswordInput } from "./inputs/PasswordInput";
import { FileInput } from "./inputs/FileInput";

export const RegisterForm = ({ formik }) => {
  //TODO add profile image input

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
      <div className="flex gap-2">
        <input
          className="customInput"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          id="email"
          type="email"
          placeholder="Email"
        />

        <FileInput name="file" formik={formik} />
      </div>
      <PasswordInput formik={formik} />
    </div>
  );
};
