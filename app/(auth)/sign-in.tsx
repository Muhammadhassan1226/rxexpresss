import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { icons } from "@/constants";
import { LogininitialValues, LoginSchema } from "@/schemas/loginSchemas";
import { useAppDispatch } from "@/store/hooks";
import { userLogin } from "@/store/slice/authslice";
import { Link, router } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async (
    values: typeof LogininitialValues,
    { setSubmitting }: FormikHelpers<typeof LogininitialValues>,
  ) => {
    try {
      setSubmitting(true);
      dispatch(userLogin(values)).then((res) => {
        if (res && res.type === "user/login/fulfilled") {
          window.location.replace("/Dashboard");
          console.log("response", res);
        }
      });
      router.push("/Dashboard");
    } catch (error: any) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="justify-center flex-1 p-3 px-6 ">
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

              <CustomButton
                title="Login"
                className="mt-3 text-lg"
                onPress={() => handleSubmit()}
                textVariant="primary"
                isSubmitting={isSubmitting}
              />
            </View>
          )}
        </Formik>
        {/* ForgetPassword */}
        <Link className="self-end" href="/forgot-password">
          <Text className="text-red-500 font-bold text-lg">
            {" "}
            Forgot Password?
          </Text>
        </Link>
        {/* OAuth */}

        <Link className="mt-5" href="/signup">
          <Text>Already have an Account?</Text>
          <Text className="text-primary-500 text-lg"> Signup</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Signin;
