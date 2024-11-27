import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { icons, images } from "@/constants";
import { useAppDispatch } from "@/store/hooks";
import { new_password, reset_password } from "@/store/slice/authslice";
import { Link, router } from "expo-router";
import React from "react";
import { useState } from "react";
import { Text, View, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const [form, setform] = useState({
    email: "",
    code: "",
    newpass: "",
  });

  const LoginPress = () => {
    try {
      dispatch(
        new_password({
          email: form.email,
          code: form.code,
          newPassword: form.newpass,
        }),
      )
        .unwrap()
        .then((res: any) => {
          if (res && res.type === "user/reset_request/fulfilled") {
            window.location.replace("/Dashboard");
          }
        });
      Alert.alert("Code Accepted");
      router.navigate("/Dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Link
        className="self-start ml-5 px-5 py-2 rounded border-2 border-blue-500"
        href="/sign-in"
      >
        <Text className="text-black-500 font-bold text-lg">Back</Text>
      </Link>
      <View className="justify-center flex-1 p-3 px-6 ">
        <Image
          source={icons.loginIcon}
          className="w-20 h-20 mt-5 self-center"
        />

        <Text className="text-black text-center my-5 font-JakartaSemiBold text-2xl ">
          Enter New
          <Text className="text-danger-700">Password</Text>
        </Text>
        <CustomInput
          label="Email"
          placeholder="Enter Your Email"
          icon={icons.email}
          value={form.email}
          labelStyle="mb-2"
          onChangeText={(value: string) => setform({ ...form, email: value })}
        />
        <CustomInput
          label="Code"
          placeholder="Enter Code"
          icon={icons.eyecross}
          value={form.code}
          labelStyle="mb-2"
          onChangeText={(value: string) => setform({ ...form, code: value })}
        />
        <CustomInput
          label="New Password"
          placeholder="Enter New Secret"
          icon={icons.lock}
          value={form.newpass}
          labelStyle="mb-2"
          onChangeText={(value: string) => setform({ ...form, newpass: value })}
        />
        <CustomButton
          title="Go to Home"
          className="mt-3 text-lg"
          onPress={LoginPress}
          textVariant="primary"
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
