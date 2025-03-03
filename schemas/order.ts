import * as yup from "yup";
export const OrderSchema = yup.object().shape({
    recipientName: yup
        .string()
        .min(2, "Name is too short")
        .max(50, "Name is too long")
        .required("Name is required"),



    phone: yup
        .string()
        .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
        .required("Phone number is required"),

    address: yup.string().required("Address is required"),
    deliveryMethods: yup.string().required("Please enter the delivery Methods"),
    instructions: yup.string(),
    paymentMethod: yup.string().required("Please select the payement method")

});

export const OrderinitialValues = {
    recipientName: "",
    phone: "",
    address: "",
    deliveryMethods: "Online Signature",
    dateToDeliver: new Date(),
    instructions: "",
    status: "Ready For Pickup",
    userId: 0,
    deliverySubtypeId: "",
    paymentMethod: "COD",
    paymentStatus: "COD",
    amount: 0
};
