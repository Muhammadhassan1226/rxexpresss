import { Text, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { getManhattanOrders } from "@/store/slice/orderslice";
import Spinner from "react-native-loading-spinner-overlay";
import SearchBar from "@/components/SearchBar";
import OrderItem from "@/components/OrderItem";
import Header from "@/components/Header";
const Manhattan = () => {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState("");
  const { manhattanOrders, loading } = useAppSelector(
    (state: RootState) => state.order,
  );
  const dispatch = useAppDispatch();
  console.log("Loading", loading);
  const handleMahattanOrder = async () => {
    try {
      const res = await dispatch(getManhattanOrders({}));
      if (
        res &&
        res.type === "api/Order/manhattan?page=1&pageSize=15/fulfilled"
      ) {
        console.log("SuccessFull getManhattanOrders My Order");
      } else {
        console.log("Fail getManhattanOrders My order");
      }
    } catch (error: any) {
      console.log("Fail getManhattanOrders My order");
    }
  };
  const handleSearch = async () => {
    try {
      const res = await dispatch(getManhattanOrders({ search }));
      if (
        res &&
        res.type === "api/Order/manhattan?page=1&pageSize=15/fulfilled"
      ) {
        console.log("SuccessFull getManhattanOrders My Order");
      } else {
        console.log("Fail getManhattanOrders My order");
      }
    } catch (error: any) {
      console.log("Fail getManhattanOrders My order");
    }
  };
  useEffect(() => {
    handleMahattanOrder();
  }, [isFocused]);
  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <StatusBar />
      <Text className="font-bold text-center text-xl pb-4">
        Manhattan Order
      </Text>
      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        onPress={handleSearch}
      />
      <Header
        first="Recipient Name"
        second="Status"
        third="Price"
        forth="Payment Status"
      />
      {manhattanOrders.length == 0 && (
        <Text className="text-center my-4">No record Found</Text>
      )}
      <FlatList
        data={manhattanOrders}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item, index }) => {
          return (
            <OrderItem
              id={item.id}
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

export default Manhattan;
