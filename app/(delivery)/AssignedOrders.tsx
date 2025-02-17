import { useState, useEffect } from "react";
import {
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import Spinner from "react-native-loading-spinner-overlay";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import { getAssignedOrder } from "@/store/slice/deliveryslice";
import OrderDeliveryItem from "@/components/OrderDeliveryItem";

const AssignedOrders = () => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector(
    (state: RootState) => state.delivery,
  );
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15); // Number of items per page
  const [search, setSearch] = useState("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Fetch orders for the current page
  const handleFetchOrders = async (reset = false) => {
    if (loading || isFetchingMore) return;

    const currentPage = reset ? 1 : page;

    try {
      await dispatch(
        getAssignedOrder({
          search,
          page: currentPage,
          pageSize,
        }),
      );

      if (reset) {
        setPage(2); // Reset pagination
      } else {
        setPage((prev) => prev + 1); // Increment page
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Handle initial fetch or reset on focus
  useEffect(() => {
    handleFetchOrders(true);
  }, [isFocused]);

  // Handle search
  const handleSearch = () => {
    handleFetchOrders(true); // Reset and fetch new data
  };

  // Handle load more
  const loadMoreOrders = async () => {
    if (isFetchingMore || orders.orders.length >= orders.totalOrders) return;

    setIsFetchingMore(true); // Start fetching
    await handleFetchOrders();
    setIsFetchingMore(false); // Fetching done
  };

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <StatusBar />
      <Text className="font-bold text-center text-xl pb-4">
        All Delivery Orders
      </Text>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        onPress={handleSearch}
      />

      <ScrollView
        className="mt-5"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <FlatList
          data={orders.orders}
          ListHeaderComponent={() => <Header />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <OrderDeliveryItem
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
              signatureImageUrl={item.signatureImageUrl}
            />
          )}
          ListEmptyComponent={
            !loading ? (
              <Text className="text-center my-4">No records found</Text>
            ) : null
          }
          onEndReached={loadMoreOrders}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingMore ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssignedOrders;
