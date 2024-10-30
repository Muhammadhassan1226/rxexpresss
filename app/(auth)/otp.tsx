import { Image, SafeAreaView, Text, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import OtpTextInput from "react-native-text-input-otp";

const Otp = () => {
  const [otpInput, setotpInput] = useState("");
  const OtpSubmit = () => {};
  return (
    <SafeAreaView className="flex-1 bg-white px-5">
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
            setOtp={setotpInput}
            digits={5}
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
