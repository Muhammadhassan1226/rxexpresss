import { InputFieldProps } from "@/types/type";
import {
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TextInput,
  Platform,
  Keyboard,
  Pressable,
} from "react-native";

const CustomInput = ({
  label,
  labelStyle,
  icon,
  expoIcon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  keyboardType,
  error,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`font-JakartaSemiBold text-md ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={` flex justify-start items-center flex-row relative bg-neutral-100 rounded-full  border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            <View className="w-6 h-6 ml-4">{expoIcon}</View>
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              keyboardType={keyboardType}
              className={` rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
          {error && <Text className="text-red-600 self-end">{error}</Text>}
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default CustomInput;
