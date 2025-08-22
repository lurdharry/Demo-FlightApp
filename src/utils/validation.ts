import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(4, "Too short").required("Password required"),
});

export const signupSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too short").required("First name required"),
  lastName: Yup.string().min(2, "Too short").required("Last name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const searchSchema = Yup.object().shape({
  origin: Yup.string().required("Origin city required"),
  destination: Yup.string().required("Destination city required"),
});
