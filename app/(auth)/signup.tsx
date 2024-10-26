import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, ScrollView, Image } from "react-native";

const Signup = () => {
  const [form, setform] = useState({
    name: " ",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    businessName: "",
    doingBusinessAs: "",
    addrress: "",
    city: "",
    state: "",
    zipcode: 0,
    apt: "",
    facility: "",
    role: "",
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
            expoIcon={<icons.AntDesign name="user" size={24} color="black" />}
            value={form.name}
            labelStyle="mb-2"
            onChangeText={(value: string) => setform({ ...form, name: value })}
          />
          <CustomInput
            label="Phone Number"
            placeholder="03374672001"
            expoIcon={<icons.AntDesign name="phone" size={24} color="black" />}
            value={form.phone}
            labelStyle="mb-2"
            onChangeText={(value: string) => setform({ ...form, phone: value })}
          />
          <CustomInput
            label="Email"
            placeholder="Enter Your Email"
            expoIcon={
              <icons.FontAwesome name="envelope-o" size={24} color="black" />
            }
            value={form.email}
            labelStyle="mb-2"
            onChangeText={(value: string) => setform({ ...form, email: value })}
          />
          <CustomInput
            label="Password"
            placeholder="Secret Here"
            expoIcon={<icons.FontAwesome name="lock" size={24} color="black" />}
            value={form.password}
            labelStyle="mb-2"
            onChangeText={(value: string) =>
              setform({ ...form, password: value })
            }
          />
          <CustomInput
            label="Confirm Password"
            placeholder="Secret Here"
            expoIcon={<icons.FontAwesome name="lock" size={24} color="black" />}
            value={form.confirmPassword}
            labelStyle="mb-2"
            onChangeText={(value: string) =>
              setform({ ...form, confirmPassword: value })
            }
          />
          <CustomInput
            label="Business Name"
            placeholder="Business Name"
            expoIcon={
              <icons.Ionicons name="business" size={24} color="black" />
            }
            value={form.businessName}
            labelStyle="mb-2"
            onChangeText={(value: string) =>
              setform({ ...form, businessName: value })
            }
          />
          <CustomInput
            label="Select your Role"
            placeholder="Select your Role"
            expoIcon={
              <icons.Foundation name="torso-business" size={24} color="black" />
            }
            value={form.doingBusinessAs}
            labelStyle="mb-2"
            onChangeText={(value: string) =>
              setform({ ...form, doingBusinessAs: value })
            }
          />
          <CustomInput
            label="Adress"
            placeholder="Adress"
            expoIcon={
              <icons.Entypo name="location-pin" size={24} color="black" />
            }
            value={form.addrress}
            labelStyle="mb-2"
            onChangeText={(value: string) =>
              setform({ ...form, addrress: value })
            }
          />
          <CustomInput
            label="City"
            placeholder="City"
            expoIcon={
              <icons.FontAwesome5 name="city" size={24} color="black" />
            }
            value={form.city}
            labelStyle="mb-2"
            onChangeText={(value: string) => setform({ ...form, city: value })}
          />
          <CustomInput
            label="Country"
            placeholder="Country"
            expoIcon={<icons.Entypo name="globe" size={24} color="black" />}
            value={form.state}
            labelStyle="mb-2"
            onChangeText={(value: string) => setform({ ...form, state: value })}
          />
          <CustomInput
            label="zip code"
            placeholder="zip code"
            keyboardType="numeric"
            expoIcon={
              <icons.Entypo name="location-pin" size={24} color="black" />
            }
            value={form.zipcode}
            labelStyle="mb-2"
            onChangeText={(value: number) =>
              setform({ ...form, zipcode: value })
            }
          />
          <CustomInput
            label="APT"
            placeholder="APT"
            icon={icons.lock}
            value={form.apt}
            labelStyle="mb-2"
            onChangeText={(value: string) => setform({ ...form, apt: value })}
          />

          <CustomButton
            title="Signup"
            className="mt-3 text-lg"
            onPress={SignupPress}
            textVariant="primary"
          />

          {/* OAuth */}

          <Link className="my-5" href="/sign-in">
            <Text>Already have an Account?</Text>
            <Text className="text-primary-500 text-lg"> Login</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
