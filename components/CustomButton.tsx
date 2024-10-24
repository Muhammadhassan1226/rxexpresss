import { ButtonProps } from "@/types/type";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import React from "react";

const getbgVariantStye = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "success":
      return "bg-green-500";
    case "danger":
      return "bg-red-500";
    case "outline":
      return "bg-transparent-500 border-neutral-300 border-[0.5px]";
    default:
      return "bg-primary-500";
  }
};

const getTextVariant = (varaint: ButtonProps["textVariant"]) => {
  switch (varaint) {
    case "primary":
      return "text-white";
    case "secondary":
      return "text-gray-100";
    case "success":
      return "text-green-100";
    case "danger":
      return "text-red-100";
    default:
      return "text-black";
  }
};
const CustomButton = ({
  onPress,
  title,
  bgVariant,
  textVariant,
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex w-full rounded-full justify-center p-3 flex-row items-center shadow-md shadow-neutral-400/70 ${getbgVariantStye(bgVariant)} ${className}`}
    {...props}
  >
    {IconLeft && <IconLeft />}
    <Text className={`text-md font-bold ${getTextVariant(textVariant)}`}>
      {title}
    </Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
);

export default CustomButton;
