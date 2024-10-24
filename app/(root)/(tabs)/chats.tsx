import { Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
const Chats = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text>Chats</Text>
      <StatusBar />
    </SafeAreaView>
  );
};

export default Chats;