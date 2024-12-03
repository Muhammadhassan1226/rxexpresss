import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { icons, images } from "@/constants";
import { LogininitialValues, LoginSchema } from "@/schemas/loginSchemas";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userLogin } from "@/store/slice/authslice";
import { Href, Link, router } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import { Text, View, Image, Alert } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
const Signin = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.auth.loading);
  console.log("Loading", loading);
  const handleLogin = async (
    values: typeof LogininitialValues,
    { setSubmitting }: FormikHelpers<typeof LogininitialValues>,
  ) => {
    try {
      setSubmitting(true);
      const RemovingSpaces = {
        ...values,
        password: values.password.trim(),
      };

      const res = await dispatch(userLogin(RemovingSpaces));
      console.log("values", values);

      if (
        res.payload &&
        typeof res.payload === "object" &&
        "role" in res.payload
      ) {
        const { role } = res.payload;
        console.log("User Role:", role); // Debug log

        if (role === "Admin") {
          router.replace("/AdminDashboard");
        } else {
          router.replace("/Dashboard");
        }
      } else {
        router.replace("/Dashboard"); // Default route if role not found
      }
    } catch (error: any) {
      console.log("erorr", error);
      Alert.alert(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <View className="flex justify-center items-center">
        <Image source={images.auth} className="h-72 w-64 mt-2 " />
        <Image
          source={icons.loginIcon}
          className="w-20 h-20 mt-5 self-center"
        />
        <Text className="text-black text-center my-5 font-JakartaSemiBold text-2xl ">
          Login
          <Text className="text-danger-700"> Account</Text>
        </Text>
        <Formik
          initialValues={LogininitialValues}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            isSubmitting,
            touched,
            errors,
          }) => (
            <View>
              <CustomInput
                label="Email"
                placeholder="Enter Your Email"
                icon={icons.email}
                value={values.email}
                labelStyle="mb-2"
                onChangeText={handleChange("email")}
                error={errors.email}
              />
              <CustomInput
                label="Password"
                placeholder="Secret Here"
                icon={icons.lock}
                value={values.password}
                labelStyle="mb-2"
                onChangeText={handleChange("password")}
                error={errors.password}
              />
              <View>
                <CustomButton
                  title="Login"
                  className="mt-3 text-lg"
                  onPress={() => handleSubmit()}
                  textVariant="primary"
                  isSubmitting={isSubmitting}
                />
              </View>
            </View>
          )}
        </Formik>
        {/* ForgetPassword */}
      </View>
      <View className="justify-center items-center flex-1 px-6 mt-0">
        {/* Forgot Password Section */}
        <View className="mt-10 justify-center items-center">
          <Text className="text-amber-600 font-bold text-xl">
            "Life is too short for forgettable passwords"
          </Text>
          <Link href="/forgot-password" className="mt-2">
            <Text className="text-blue-600 text-base font-semibold">
              Reset your password →
            </Text>
          </Link>
        </View>

        {/* Signup Section */}
        <View className="mt-8 items-center">
          <Text className="text-gray-600 text-base">New to our community?</Text>
          <Link href="/signup" className="mt-2">
            <Text className="text-primary-500 text-lg font-semibold">
              Create your account today
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signin;
