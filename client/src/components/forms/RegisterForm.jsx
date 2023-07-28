import React from "react";
import { PasswordInput } from "./inputs/PasswordInput";
import { FileInput } from "./inputs/FileInput";
import { TextInput } from "./inputs/TextInput";

export const RegisterForm = ({ formik }) => {
  return (
    <div className="formContainer">
      <TextInput name="fullName" placeholder="Full Name" formik={formik} />
      <div className="flex gap-2 items-stretch">
        <TextInput
          className=""
          name="email"
          id="email"
          placeholder="Email"
          formik={formik}
        />

        <FileInput name="file" formik={formik} />
      </div>
      <PasswordInput formik={formik} />
    </div>
  );
};
