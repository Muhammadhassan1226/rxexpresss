import { Text, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { getQueensOrders } from "@/store/slice/orderslice";
import OrderItem from "@/components/OrderItem";
import OrderHeader from "@/components/OrderHeader";
import SearchBar from "@/components/SearchBar";
import Spinner from "react-native-loading-spinner-overlay";

const Queens = () => {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState("");
  const { queensOrders, loading } = useAppSelector(
    (state: RootState) => state.order,
  );
  const dispatch = useAppDispatch();
  console.log("Loading", loading);
  const handleQueensOrder = async () => {
    try {
      const res = await dispatch(getQueensOrders());
      if (res && res.type === "api/Order/Queens?page=1&pageSize=15/fulfilled") {
        console.log("SuccessFull getQueensOrders My Order");
      } else {
        console.log("Fail getQueensOrders My order");
      }
    } catch (error: any) {
      console.log("Fail getQueensOrders My order");
    }
  };
  const handleSearch = () => {
    console.log(search);
  };
  useEffect(() => {
    handleQueensOrder();
  }, [isFocused]);
  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <StatusBar />
      <Text className="font-bold text-center text-xl pb-4">Queens Order</Text>
      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        onPress={handleSearch}
      />
      <OrderHeader />
      {queensOrders.length == 0 && (
        <Text className="text-center my-4">No record Found</Text>
      )}
      <FlatList
        data={queensOrders}
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

export default Queens;
