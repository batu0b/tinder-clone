import React, { useState } from "react";
import { CloseEyeIco, OpenEyeIco } from "../../../assets/icons";

export const PasswordInput = ({ formik }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full relative">
      <input
        className="customInput w-full"
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        id="password"
        type={show ? "text" : "password"}
        placeholder="Password"
      />
      <button
        onClick={() => setShow(!show)}
        type="button"
        className="absolute top-1/2 -translate-y-1/2 text-black right-4 "
      >
        {show ? <CloseEyeIco className="text-[#e43569]" /> : <OpenEyeIco className="text-[#e43569]" />}
      </button>
    </div>
  );
};
