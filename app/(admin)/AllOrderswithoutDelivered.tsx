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
import { AllOrdersWithoutDelivered } from "@/store/slice/adminslice";

const AllOrderswithoutdelivered2 = () => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { AllOrdersWithoutDelivered: orders, loading } = useAppSelector(
    (state: RootState) => state.admin,
  );
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15); // Number of items per page
  const [search, setSearch] = useState("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Fetch NassuOrders for the current page
  const handleFetchOrders = async (reset = false) => {
    if (loading || isFetchingMore) return;

    const currentPage = reset ? 1 : page;

    try {
      await dispatch(
        AllOrdersWithoutDelivered({
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
      console.error("Error fetching NassuOrders:", error);
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
    if (
      isFetchingMore ||
      !orders?.orders ||
      orders.orders.length >= (orders.totalOrders || 0)
    )
      return;

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
        All Orders Without Delivered
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
        data={orders?.orders || []}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OrderItem
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
        onEndReached={loadMoreOrders}
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

export default AllOrderswithoutdelivered2;
