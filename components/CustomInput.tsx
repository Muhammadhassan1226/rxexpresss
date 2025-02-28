import React, { useState } from "react";
import { InputFieldProps } from "@/types/type";
import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { icons } from "@/constants";

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
  const [isPasswordHidden, setIsPasswordHidden] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <View className="my-2 w-full">
        {label && (
          <Text className={`font-JakartaSemiBold text-md ${labelStyle}`}>
            {label}
          </Text>
        )}
        <View
          className={`flex justify-start items-center flex-row relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
        >
          <View className="w-6 h-6 ml-4">{expoIcon}</View>
          {icon && (
            <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
          )}
          <TextInput
            keyboardType={keyboardType}
            className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
            secureTextEntry={isPasswordHidden}
            {...props}
          />
          {secureTextEntry && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              className="absolute right-4"
            >
              {isPasswordHidden ? (
                <icons.Entypo name="eye" size={24} color="black" />
              ) : (
                <icons.Entypo name="eye-with-line" size={24} color="black" />
              )}
            </TouchableOpacity>
          )}
        </View>
        {error && <Text className="text-red-600 self-end">{error}</Text>}
      </View>
    </Pressable>
  );
};

export default CustomInput;
