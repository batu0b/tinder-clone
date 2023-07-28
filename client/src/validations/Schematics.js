import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  fullName: Yup.string().trim().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      "Password must contain at least one special character"
    )
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
  file: Yup.mixed().nullable().required("File is required"),
  avatarFile: Yup.string().trim().required("Avatar file is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
