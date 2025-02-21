import * as yup from "yup";
export const SignupSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
    .required("Phone number is required"),
  businessName: yup.string().required("Business name is required"),
  addrress: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipcode: yup.number().required("Zipcode is required"),
  apt: yup.string(),
  facility: yup.string().required("Facility is required"),
  role: yup
    .string()
    .oneOf(["User", "Admin", "Delivery"], "Invalid role")
    .required("Role is required"),
});

export const SignupinitialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  businessName: "",
  doingBusinessAs: "",
  addrress: "",
  city: "",
  state: "",
  zipcode: "",
  apt: "",
  facility: "",
  role: "PharmacyUser",
};
