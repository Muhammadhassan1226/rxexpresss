import { Text, StatusBar, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getNassauOrders } from "@/store/slice/orderslice";
import { Header, SearchBar, OrderItem } from "@/components";
import Spinner from "react-native-loading-spinner-overlay";

const Nassau = () => {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState("");
  const { NassauOrders, loading } = useAppSelector(
    (state: RootState) => state.order
  );
  const dispatch = useAppDispatch();
  console.log("Loading", loading);
  const handleNassauOrder = async () => {
    try {
      const res = await dispatch(getNassauOrders({}));
      if (res && res.type === "api/Order/Nassau?page=1&pageSize=15/fulfilled") {
        console.log("SuccessFull getNassauOrders My Order");
      } else {
        console.log("Fail getNassauOrders My order");
      }
    } catch (error: any) {
      console.log("Fail getNassauOrders My order");
    }
  };
  const handleSearch = async () => {
    try {
      const res = await dispatch(getNassauOrders({ search }));
      if (res && res.type === "api/Order/Nassau?page=1&pageSize=15/fulfilled") {
        console.log("SuccessFull getNassauOrders My Order");
      } else {
        console.log("Fail getNassauOrders My order");
      }
    } catch (error: any) {
      console.log("Fail getNassauOrders My order");
    }
  };
  useEffect(() => {
    handleNassauOrder();
  }, [isFocused]);
  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <StatusBar />
      <Text className="font-bold text-center text-xl py-4">Nassau Order</Text>
      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        onPress={handleSearch}
      />
      <ScrollView
        className="mt-5"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <FlatList
          data={NassauOrders}
          ListHeaderComponent={() => <Header />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <OrderItem
              id={item.id}
              recipientName={item.recipientName}
              phone={item.phone}
              address={item.address}
              deliveryMethods={item.deliveryMethods}
              dateToDeliver={item.dateToDeliver}
              instructions={item.instructions}
              status={item.status}
              paymentStatus={item.paymentStatus}
              deliverySubtypeId={item.deliverySubtypeId}
              name={item.name}
              rate={item.rate}
              businessName={item.businessName}
            />
          )}
          ListEmptyComponent={
            !loading ? (
              <Text className="text-center my-4">No records found</Text>
            ) : null
          }
          onEndReachedThreshold={0.5}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Nassau;
