import { Text, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getNasauOrders } from "@/store/slice/orderslice";
import SearchBar from "@/components/SearchBar";
import OrderHeader from "@/components/OrderHeader";
import OrderItem from "@/components/OrderItem";
import Spinner from "react-native-loading-spinner-overlay";

const Nasau = () => {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState("");
  const { nasauOrders, loading } = useAppSelector(
    (state: RootState) => state.order,
  );
  const dispatch = useAppDispatch();
  console.log("Loading", loading);
  const handleNasauOrder = async () => {
    try {
      const res = await dispatch(getNasauOrders());
      if (res && res.type === "api/Order/Nasau?page=1&pageSize=15/fulfilled") {
        console.log("SuccessFull getNasauOrders My Order");
      } else {
        console.log("Fail getNasauOrders My order");
      }
    } catch (error: any) {
      console.log("Fail getNasauOrders My order");
    }
  };
  const handleSearch = () => {
    console.log(search);
  };
  useEffect(() => {
    handleNasauOrder();
  }, [isFocused]);
  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <StatusBar />
      <Text className="font-bold text-center text-xl pb-4">Nasau Order</Text>
      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        onPress={handleSearch}
      />
      <OrderHeader />
      {nasauOrders.length == 0 && (
        <Text className="text-center my-4">No record Found</Text>
      )}
      <FlatList
        data={nasauOrders}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item, index }) => {
          return (
            <OrderItem
              name={item.name}
              price={item.rate}
              status={item.status}
              paymentStatus={item.paymentStatus}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Nasau;
