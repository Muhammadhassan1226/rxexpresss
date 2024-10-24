import { Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text>Profile</Text>
      <StatusBar />
    </SafeAreaView>
  );
};

export default Profile;
