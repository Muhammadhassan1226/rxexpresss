import { Text, StatusBar, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getNasauOrders } from "@/store/slice/orderslice";
import { Header, SearchBar, OrderItem } from "@/components";
import Spinner from "react-native-loading-spinner-overlay";

const Nasau = () => {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState("");
  const { nasauOrders, loading } = useAppSelector(
    (state: RootState) => state.order
  );
  const dispatch = useAppDispatch();
  console.log("Loading", loading);
  const handleNasauOrder = async () => {
    try {
      const res = await dispatch(getNasauOrders({}));
      if (res && res.type === "api/Order/Nasau?page=1&pageSize=15/fulfilled") {
        console.log("SuccessFull getNasauOrders My Order");
      } else {
        console.log("Fail getNasauOrders My order");
      }
    } catch (error: any) {
      console.log("Fail getNasauOrders My order");
    }
  };
  const handleSearch = async () => {
    try {
      const res = await dispatch(getNasauOrders({ search }));
      if (res && res.type === "api/Order/Nasau?page=1&pageSize=15/fulfilled") {
        console.log("SuccessFull getNasauOrders My Order");
      } else {
        console.log("Fail getNasauOrders My order");
      }
    } catch (error: any) {
      console.log("Fail getNasauOrders My order");
    }
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
      <Text className="font-bold text-center text-xl py-4">Nasau Order</Text>
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
          data={nasauOrders}
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

export default Nasau;
