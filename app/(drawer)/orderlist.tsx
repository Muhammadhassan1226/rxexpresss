import { Text, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import OrderHeader from "@/components/OrderHeader";
import OrderItem from "@/components/OrderItem";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { getMyOrder } from "@/store/slice/orderslice";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import SearchBar from "@/components/SearchBar";

const OrderList = () => {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState("");
  const { orders, loading } = useAppSelector((state: RootState) => state.order);
  const dispatch = useAppDispatch();
  console.log("Loading", loading);
  const handleGetMyOrder = async () => {
    try {
      const res = await dispatch(getMyOrder({}));
      console.log("response", res);
      if (
        res &&
        res.type === "api/Order/my-orders?page=1&pageSize=15/fulfilled"
      ) {
        console.log("SuccessFull Get My Order");
      } else {
        console.log("Fail Get My order");
      }
    } catch (error: any) {
      console.log("Fail Get Get My order");
    }
  };
  const handleSearch = async () => {
    try {
      const res = await dispatch(getMyOrder({ search }));
      console.log("response", res);
      if (
        res &&
        res.type === "api/Order/my-orders?page=1&pageSize=15/fulfilled"
      ) {
        console.log("SuccessFull Get My Order");
      } else {
        console.log("Fail Get My order");
      }
    } catch (error: any) {
      console.log("Fail Get Get My order");
    }
  };
  useEffect(() => {
    handleGetMyOrder();
  }, [isFocused]);

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <StatusBar />
      <Text className="font-bold text-center text-xl pb-4">My Order</Text>
      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        onPress={handleSearch}
      />
      <OrderHeader />
      {orders.length == 0 && (
        <Text className="text-center my-4">No record Found</Text>
      )}
      <FlatList
        data={orders}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item, index }) => {
          return (
            <OrderItem
              name={item.recipientName}
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

export default OrderList;
