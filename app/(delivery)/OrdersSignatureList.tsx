import { useState, useEffect } from "react";
import { Text, StatusBar, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import Spinner from "react-native-loading-spinner-overlay";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import { getAssignedOrderSignaure } from "@/store/slice/deliveryslice";
import OrderDeliveryItem from "@/components/OrderDeliveryItem";

const OrdersSignatureList = () => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { signatureOrders, loading } = useAppSelector(
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
        getAssignedOrderSignaure({
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
    // Prevent multiple simultaneous calls
    if (isFetchingMore) return;

    // Check if all orders have already been loaded
    if (signatureOrders?.orders.length >= signatureOrders?.totalOrders) return;

    try {
      setIsFetchingMore(true); // Start fetching
      await handleFetchOrders(); // Fetch more orders
    } catch (error) {
      console.error("Error loading more orders:", error);
    } finally {
      setIsFetchingMore(false); // Fetching done
    }
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
        All Signature Orders
      </Text>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        onPress={handleSearch}
      />
      <Header
        first="Recipient Name"
        second="Status"
        third="Price"
        forth="Payment Status"
      />
      <FlatList
        data={signatureOrders?.orders}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OrderDeliveryItem
            id={item.id}
            name={item.name}
            price={item.rate}
            status={item.status}
            paymentStatus={item.paymentStatus}
          />
        )}
        ListEmptyComponent={
          !loading ? (
            <Text className="text-center my-4">No records found</Text>
          ) : null
        }
        // onEndReached={loadMoreOrders}
        onEndReachedThreshold={0.1} // Trigger closer to the bottom
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default OrdersSignatureList;
