import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
const Welcome = () => {
  const swiperef = useRef<Swiper>(null);
  const [activeIndex, setactiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="flex h-full justify-between items-center bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/signup");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-sm font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperef}
        loop={false}
        dot={
          <View className="h-[5px] w-[32px] mx-1 bg-[#e2e8f0] rounded-full" />
        }
        activeDot={
          <View className="h-[5px] w-[32px] mx-1 bg-[#0286ff] rounded-full" />
        }
        onIndexChanged={(Index) => setactiveIndex(Index)}
      >
        {onboarding.map((item) => (
          <View className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              resizeMode="contain"
              className="h-[300px] w-full"
            />
            <View className="flex items-center justify-center w-full mt-9 flex-row">
              <Text
                key={item.id}
                className="text-3xl text-black font-bold mx-9 text-center"
              >
                {item.title}
              </Text>
            </View>
            <Text className="mx-9 mt-4 font-JakartaSemiBold text-base text-center text-[#858585]">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Getting Started" : "Next"}
        className="w-11/12"
        textVariant="primary"
        onPress={() => 
          isLastSlide
            ? router.replace("/(auth)/signup")
            : swiperef.current?.scrollBy(1)
        }
      />
    </SafeAreaView>
  );
};

export default Welcome;
