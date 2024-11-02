import * as yup from "yup";
export const LoginSchema = yup.object().shape({

    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .required("Password is required"),
});

export const LogininitialValues = {
    email: "",
    password: "",
};
