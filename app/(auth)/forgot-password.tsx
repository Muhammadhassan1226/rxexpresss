import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { icons, images } from "@/constants";
import { useAppDispatch } from "@/store/hooks";
import { reset_password } from "@/store/slice/authslice";
import { Href, Link, router } from "expo-router";
import { useState } from "react";
import { Text, View, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const [form, setform] = useState({
    email: "",
  });

  const LoginPress = () => {
    try {
      dispatch(reset_password({ email: form.email }))
        .unwrap()
        .then((res: any) => {
          if (res && res.type === "user/reset_request/fulfilled") {
            window.location.replace("/Newpassword");
          }
        });
      Alert.alert("Request Accept");
      router.push("/Newpassword" as Href);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="flex-1 px-5 bg-white">
      <Link
        className="self-start  px-5 py-2 rounded border-2 border-blue-500"
        href="/sign-in"
      >
        <Text className="text-black-500 font-bold text-lg">Back</Text>
      </Link>
      <View>
        <Image source={images.forgot} className="h-72 self-center w-64 mt-2 " />
        <Image
          source={icons.loginIcon}
          className="w-20 h-20 mt-5 self-center"
        />

        <Text className="text-black text-center my-5 font-JakartaSemiBold text-2xl ">
          Forgot
          <Text className="text-danger-700 ">Password</Text>
        </Text>
        <View>
          <CustomInput
            label="Email"
            placeholder="Enter Your Email"
            icon={icons.email}
            value={form.email}
            labelStyle="mb-2"
            onChangeText={(value: string) => setform({ ...form, email: value })}
          />
          <View>
            <CustomButton
              title="Forgot Password"
              className="mt-3 text-lg"
              onPress={LoginPress}
              textVariant="primary"
            />
          </View>
        </View>
      </View>
      <View className=" flex-1 px-6 mt-0">
        {/* Forgot Password Section */}
        <View className="mt-4 justify-center items-center">
          <Link href="/sign-in">
            <Text className="text-blue-600 text-base font-semibold">
              Remember your password →
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
