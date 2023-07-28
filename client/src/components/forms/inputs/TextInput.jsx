import React from "react";

export const TextInput = ({
  formik,
  name,
  className = "w-full",
  placeholder,
}) => {
  return (
    <div className="w-full">
      <input
        className={`customInput  ${className}`}
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        id={name}
        type="text"
        placeholder={placeholder}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-red-500">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};
