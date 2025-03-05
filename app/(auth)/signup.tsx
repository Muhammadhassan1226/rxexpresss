import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import { Link } from "expo-router";
import { Text, View, ScrollView, Image, Alert } from "react-native";
import { Formik, FormikHelpers } from "formik";
import { SignupinitialValues, SignupSchema } from "@/schemas/signup";
import { useAppDispatch } from "@/store/hooks";
import { userSignup, setEmail } from "@/store/slice/authslice";
const Signup = () => {
  const dispatch = useAppDispatch();
  const handleSignup = async (
    values: typeof SignupinitialValues,
    { setSubmitting }: FormikHelpers<typeof SignupinitialValues>
  ) => {
    console.log("SignUp Value__________________", values);
    try {
      setSubmitting(true);
      const res = await dispatch(userSignup(values));
      console.log("Response__________", res);

      if (res && res.type === "user/signup/fulfilled") {
        router.navigate("/otp");
        //@ts-ignore
        Alert.alert("Successfully", res?.payload);
      } else {
        Alert.alert("Error", "Email is already in use");
      }
      dispatch(setEmail(values.email));
    } catch (error: any) {
      console.log("Error_______________", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <View className="relative flex-1 w-full">
          <Image source={images.signupguy} className="w-full h-[200px]  " />
          <Text className="text-white font-JakartaSemiBold text-2xl absolute bottom-5 left-5">
            Create Your
            <Text className="text-danger-700"> Account</Text>
          </Text>
        </View>
        <Formik
          initialValues={SignupinitialValues}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            isSubmitting,
            touched,
            errors,
          }) => (
            <View className="py-3 px-6">
              <CustomInput
                label="Name"
                placeholder="Your Name Here"
                expoIcon={
                  <icons.AntDesign name="user" size={24} color="black" />
                }
                value={values.name}
                labelStyle="mb-2"
                onChangeText={handleChange("name")}
                error={errors.name}
              />

              <CustomInput
                label="Phone Number"
                placeholder="1-212-1234567"
                expoIcon={
                  <icons.AntDesign name="phone" size={24} color="black" />
                }
                value={values.phone}
                labelStyle="mb-2"
                onChangeText={handleChange("phone")}
                error={errors.phone}
              />

              <CustomInput
                label="Email"
                placeholder="Enter Your Email"
                expoIcon={
                  <icons.FontAwesome
                    name="envelope-o"
                    size={24}
                    color="black"
                  />
                }
                value={values.email}
                labelStyle="mb-2"
                onChangeText={handleChange("email")}
                error={errors.email}
              />
              <CustomInput
                label="Password"
                placeholder="Password"
                expoIcon={
                  <icons.FontAwesome name="lock" size={24} color="black" />
                }
                value={values.password}
                labelStyle="mb-2"
                onChangeText={handleChange("password")}
                error={errors.password}
                secureTextEntry
              />
              <CustomInput
                label="Confirm Password"
                placeholder="Confirm Password"
                expoIcon={
                  <icons.FontAwesome name="lock" size={24} color="black" />
                }
                value={values.confirmPassword}
                labelStyle="mb-2"
                onChangeText={handleChange("confirmPassword")}
                error={errors.confirmPassword}
                secureTextEntry
              />
              <CustomInput
                label="Business Name"
                placeholder="Business Name"
                expoIcon={
                  <icons.Ionicons name="business" size={24} color="black" />
                }
                value={values.businessName}
                labelStyle="mb-2"
                onChangeText={handleChange("businessName")}
                error={errors.businessName}
              />
              <CustomInput
                label="Adress"
                placeholder="Adress"
                expoIcon={
                  <icons.Entypo name="location-pin" size={24} color="black" />
                }
                value={values.addrress}
                labelStyle="mb-2"
                onChangeText={handleChange("addrress")}
                error={errors.addrress}
              />
              <CustomInput
                label="City"
                placeholder="City"
                expoIcon={
                  <icons.FontAwesome5 name="city" size={24} color="black" />
                }
                value={values.city}
                labelStyle="mb-2"
                onChangeText={handleChange("city")}
                error={errors.city}
              />
              <CustomInput
                label="Country"
                placeholder="Country"
                expoIcon={<icons.Entypo name="globe" size={24} color="black" />}
                value={values.state}
                labelStyle="mb-2"
                onChangeText={handleChange("state")}
                error={errors.state}
              />

              <CustomInput
                label="zip code"
                placeholder="zip code"
                keyboardType="numeric"
                expoIcon={
                  <icons.Entypo name="location-pin" size={24} color="black" />
                }
                value={values.zipcode}
                labelStyle="mb-2"
                onChangeText={handleChange("zipcode")}
                error={errors.zipcode}
              />
              <CustomInput
                label="APT"
                placeholder="APT"
                expoIcon={
                  <icons.FontAwesome5 name="building" size={24} color="black" />
                }
                value={values.apt}
                labelStyle="mb-2"
                onChangeText={handleChange("apt")}
                error={errors.apt}
              />
              <CustomInput
                label="Facality"
                placeholder="Facality"
                expoIcon={
                  <icons.FontAwesome5 name="industry" size={24} color="black" />
                }
                value={values.Facality}
                labelStyle="mb-2"
                onChangeText={handleChange("Facality")}
                error={errors.zipcode}
              />
              <CustomInput
                label="Doing Business As"
                placeholder="Doing Business As"
                expoIcon={
                  <icons.Foundation
                    name="torso-business"
                    size={24}
                    color="black"
                  />
                }
                value={values.doingBusinessAs}
                labelStyle="mb-2"
                onChangeText={handleChange("doingBusinessAs")}
                error={errors.doingBusinessAs}
              />

              <CustomButton
                title="Signup"
                className="mt-3 text-lg"
                onPress={() => handleSubmit()}
                textVariant="primary"
                isSubmitting={isSubmitting}
              />
              {/* OAuth */}
              <Link className="my-5" href="/sign-in">
                <Text>Already have an Account?</Text>
                <Text className="text-primary-500 text-lg"> Login</Text>
              </Link>
              <Link className="my-5" href="/otp">
                <Text>Already have an Account?</Text>
                <Text className="text-primary-500 text-lg"> otp</Text>
              </Link>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default Signup;
