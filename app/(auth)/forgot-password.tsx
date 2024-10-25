import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });

  const LoginPress = () => {};
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
          Forgot
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
          label="Old Password"
          placeholder="Secret Here"
          icon={icons.lock}
          value={form.password}
          labelStyle="mb-2"
          onChangeText={(value: string) => setform({ ...form, name: value })}
        />
        <CustomInput
          label="New Password"
          placeholder="Secret Here"
          icon={icons.lock}
          value={form.password}
          labelStyle="mb-2"
          onChangeText={(value: string) => setform({ ...form, name: value })}
        />

        <CustomButton
          title="Forgot Password"
          className="mt-3 text-lg"
          onPress={LoginPress}
          textVariant="primary"
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
