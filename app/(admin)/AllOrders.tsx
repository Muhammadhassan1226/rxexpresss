import { useState, useEffect } from "react";
import { Text, StatusBar, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import Spinner from "react-native-loading-spinner-overlay";
import OrderItem from "@/components/OrderItem";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import { getOrder } from "@/store/slice/adminslice";

const AllOrders = () => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((state: RootState) => state.admin);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15); // Number of items per page
  const [search, setSearch] = useState("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Fetch orders for the current page
  const handleFetchOrders = async (reset = false) => {
    if ((loading && !isFetchingMore) || (!reset && !hasMore)) return;

    const currentPage = reset ? 1 : page;

    try {
      const result = await dispatch(
        getOrder({
          search,
          page: currentPage,
          pageSize,
        }),
      ).unwrap();

      // Update hasMore flag
      const totalItems = reset
        ? result.orders.length
        : orders.orders.length + result.orders.length;
      setHasMore(totalItems < result.totalOrders);

      if (reset) {
        setPage(2);
      } else if (result.orders.length > 0) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Handle initial fetch or reset on focus
  // Update useEffect to properly handle initial loading
  useEffect(() => {
    if (isFocused) {
      setIsInitialLoading(true);
      setHasMore(true);
      handleFetchOrders(true).finally(() => {
        setIsInitialLoading(false);
      });
    }
  }, [isFocused]);

  // Handle search
  const handleSearch = () => {
    setIsInitialLoading(true);
    setHasMore(true);
    handleFetchOrders(true).finally(() => {
      setIsInitialLoading(false);
    });
  };

  // Handle load more
  const loadMoreOrders = async () => {
    if (
      !isFetchingMore &&
      hasMore &&
      !isInitialLoading &&
      orders.orders.length > 0
    ) {
      setIsFetchingMore(true);
      await handleFetchOrders(false);
      setIsFetchingMore(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <Spinner
        visible={isInitialLoading && loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <StatusBar />
      <Text className="font-bold text-center text-xl pb-4">
        All Pharmacy Orders
      </Text>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        onPress={handleSearch}
      />
      <Header
        first="ID"
        second="Recipient Name"
        third="Status"
        forth="Payment Status"
        fifth="Payment Status"
      />
      <FlatList
        data={orders.orders}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OrderItem
            id={item.id}
            name={item.recipientName}
            price={item.rate}
            status={item.status}
            paymentStatus={item.paymentStatus}
          />
        )}
        ListEmptyComponent={
          !isInitialLoading && !loading ? (
            <Text className="text-center my-4">No records found</Text>
          ) : null
        }
        onEndReached={loadMoreOrders}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore && hasMore ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default AllOrders;
