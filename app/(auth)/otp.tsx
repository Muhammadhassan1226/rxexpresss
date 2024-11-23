import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import OtpTextInput from "react-native-text-input-otp";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verifyOtp } from "@/store/slice/authslice";
import { router } from "expo-router";
const Otp = () => {
  const dispatch = useAppDispatch();
  const { email, loading } = useAppSelector((state) => state.auth);
  const [otpInput, setOtpInput] = useState<string>("");
  const OtpSubmit = async () => {
    try {
      dispatch(verifyOtp({ email, otp: otpInput }))
        .unwrap()
        .then((res: any) => {
          if (res && res.type === "user/verifyOtp/fulfilled") {
            window.location.replace("/sign-in");
          }
        });
      router.navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-in");
        }}
        className="w-full flex justify-start items-start p-5 mt-4"
      >
        <Text className="text-black text-lg font-JakartaBold">
          Back to Login
        </Text>
      </TouchableOpacity>
      <View className="flex-1 justify-center items-center">
        <Image
          source={icons.loginIcon}
          className="w-20 h-20 mt-5 self-center"
        />

        <Text className="text-black text-center my-5 font-JakartaSemiBold text-2xl ">
          OTP
          <Text className="text-danger-700"> Verify</Text>
        </Text>
        <View className="my-8">
          <OtpTextInput
            otp={otpInput}
            setOtp={setOtpInput}
            digits={6}
            style={{
              borderRadius: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              height: 45,
            }}
            fontStyle={{ fontSize: 20, fontWeight: "bold" }}
            focusedStyle={{ borderColor: "#5cb85c", borderBottomWidth: 2 }}
          />
        </View>

        <CustomButton
          title="Send Otp"
          className=" text-lg"
          onPress={OtpSubmit}
          textVariant="primary"
        />
      </View>
    </SafeAreaView>
  );
};

export default Otp;
