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
import { queensOrders } from "@/store/slice/adminslice";

const AllQueens = () => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { QueensOrders, loading } = useAppSelector(
    (state: RootState) => state.admin,
  );
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15); // Number of items per page
  const [search, setSearch] = useState("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Fetch QueensOrders for the current page
  const handleFetchOrders = async (reset = false) => {
    if (loading || isFetchingMore) return;

    const currentPage = reset ? 1 : page;

    try {
      await dispatch(
        queensOrders({
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
      console.error("Error fetching QueensOrders:", error);
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
      QueensOrders.orders.length >= QueensOrders.totalOrders
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
        All Queens Orders
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
        data={QueensOrders.orders}
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

export default AllQueens;
