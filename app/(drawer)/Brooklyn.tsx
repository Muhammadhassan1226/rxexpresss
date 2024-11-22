import { Text, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { getBrooklynOrders } from "@/store/slice/orderslice";
import OrderItem from "@/components/OrderItem";
import OrderHeader from "@/components/OrderHeader";
import SearchBar from "@/components/SearchBar";
import Spinner from "react-native-loading-spinner-overlay";

const Brooklyn = () => {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState("");
  const { brooklynOrders, loading } = useAppSelector(
    (state: RootState) => state.order,
  );
  const dispatch = useAppDispatch();
  console.log("Loading", loading);
  const handleBrooklynOrder = async () => {
    try {
      const res = await dispatch(getBrooklynOrders({}));
      if (res && res.type === "api/Order/Brooklyn/fulfilled") {
        console.log("SuccessFull getBrooklynOrders My Order");
      } else {
        console.log("Fail getBrooklynOrders My order");
      }
    } catch (error: any) {
      console.log("Fail getBrooklynOrders My order");
    }
  };
  const handleSearch = async () => {
    try {
      const res = await dispatch(getBrooklynOrders({ search }));
      if (res && res.type === "api/Order/Brooklyn/fulfilled") {
        console.log("SuccessFull getBrooklynOrders My Order");
      } else {
        console.log("Fail getBrooklynOrders My order");
      }
      setSearch("");
    } catch (error: any) {
      console.log("Fail getBrooklynOrders My order");
    }
  };
  useEffect(() => {
    handleBrooklynOrder();
  }, [isFocused]);
  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <StatusBar />
      <Text className="font-bold text-center text-xl pb-4">Brooklyn Order</Text>
      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        onPress={handleSearch}
      />
      <OrderHeader />
      {brooklynOrders.length == 0 && (
        <Text className="text-center my-4">No record Found</Text>
      )}
      <FlatList
        data={brooklynOrders}
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

export default Brooklyn;
