import { Text, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import OrderHeader from "@/components/OrderHeader";
import OrderItem from "@/components/OrderItem";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { getMyOrder } from "@/store/slice/orderslice";

const OrderList = () => {
  const [search, setSearch] = useState("");
  const { orders, loading } = useAppSelector((state: RootState) => state.order);
  const dispatch = useAppDispatch();
  console.log("Loading", loading);
  const handleGetMyOrder = async () => {
    try {
      const res = await dispatch(getMyOrder());
      if (res && res.type === "user/login/fulfilled") {
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
  }, []);
  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <StatusBar />

      <Text className="font-bold text-center text-xl pb-4">My Order</Text>
      <Searchbar value={search} onChangeText={(text) => setSearch(text)} />
      <OrderHeader />
      <FlatList
        data={orders}
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

export default OrderList;
