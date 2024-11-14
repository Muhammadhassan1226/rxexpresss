import { TouchableOpacityProps, TextInputProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  isSubmitting?: boolean;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  expoIcon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  error?: string;
}

declare interface CardItemProps {
  title: string;
  orderNo: number;
  subTitle: string;
}

declare interface ErrorMessageProps {
  message: string;
}
