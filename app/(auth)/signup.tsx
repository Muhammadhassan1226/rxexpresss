import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, ScrollView, Image } from "react-native";

const Signup = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });

  const SignupPress = () => {
    router.navigate("/otp");
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative flex-1 w-full">
          <Image source={images.signupguy} className="w-full h-[200px]  " />
          <Text className="text-white font-JakartaSemiBold text-2xl absolute bottom-5 left-5">
            Create Your
            <Text className="text-danger-700"> Account</Text>
          </Text>
        </View>
        <View className="p-3 px-6">
          <CustomInput
            label="Name"
            placeholder="Enter Your Name"
            icon={icons.person}
            value={form.name}
            labelStyle="mb-2"
            onChangeText={(value: string) => setform({ ...form, name: value })}
          />
          <CustomInput
            label="Email"
            placeholder="Enter Your Email"
            icon={icons.email}
            value={form.email}
            labelStyle="mb-2"
            onChangeText={(value: string) => setform({ ...form, email: value })}
          />
          <CustomInput
            label="Password"
            placeholder="Secret Here"
            icon={icons.lock}
            value={form.password}
            labelStyle="mb-2"
            onChangeText={(value: string) => setform({ ...form, name: value })}
          />

          <CustomButton
            title="Signup"
            className="mt-3 text-lg"
            onPress={SignupPress}
            textVariant="primary"
          />

          {/* OAuth */}

          <Link className="mt-5" href="/sign-in">
            <Text>Already have an Account?</Text>
            <Text className="text-primary-500 text-lg"> Login</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
