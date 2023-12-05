import * as Yup from "yup";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const loginSchema = Yup.object().shape({
  currentUsername: Yup.string().min(3).max(10).required("en azi 3 herf olmalidir"),
  FullName: Yup.string().min(3).required("en azi 3 herf olmalidir"),
  email: Yup.string().min(3).required(),
  password: Yup.string().matches(passwordRegex).required(),
});