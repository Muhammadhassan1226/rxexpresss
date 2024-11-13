import { Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

const OrderList = () => {
  const [search, setSearch] = useState("");
  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <StatusBar />

      <Text className="font-bold text-center text-xl pb-4">My Order</Text>
      <Searchbar value={search} onChangeText={(text) => setSearch(text)} />
    </SafeAreaView>
  );
};

export default OrderList;
