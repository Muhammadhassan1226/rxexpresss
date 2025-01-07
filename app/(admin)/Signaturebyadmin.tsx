import { useState, useEffect } from "react";
import { Text, StatusBar, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import Spinner from "react-native-loading-spinner-overlay";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import { SignatureOrders } from "@/store/slice/adminslice";
import Signatureitem from "@/components/SignatureItems";

const Signature = () => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { SignatureOrders: orders, loading } = useAppSelector(
    (state: RootState) => state.admin,
  );

  const [page, setPage] = useState(1);
  const [pageSize] = useState(15); // Number of items per page
  const [search, setSearch] = useState("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true); // To track if more data is available

  // Fetch SignatureOrders for the current page
  const handleFetchOrders = async (reset = false) => {
    if (loading || isFetchingMore || !hasMoreData) return;

    const currentPage = reset ? 1 : page;

    try {
      const result = await dispatch(
        SignatureOrders({
          search,
          page: currentPage,
          pageSize,
        }),
      ).unwrap();

      // Check if there is more data to load
      if (result.orders.length < pageSize || result.orders.length === 0) {
        setHasMoreData(false);
      }

      if (reset) {
        setPage(2); // Reset pagination
        setHasMoreData(true); // Reset hasMoreData when performing a fresh fetch
      } else {
        setPage((prev) => prev + 1); // Increment page
      }
    } catch (error) {
      console.error("Error fetching Signature Orders:", error);
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
      isFetchingMore || // Avoid multiple simultaneous requests
      !hasMoreData || // Stop fetching if no more data
      !orders?.orders || // Ensure orders are defined
      orders.orders.length >= (orders.totalOrders || 0) // All data fetched
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
        All Signature Orders From Admin
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
        data={orders?.orders || []}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Signatureitem
            id={item.id}
            name={item.recipientName}
            price={item?.rate}
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
          ) : !hasMoreData ? (
            <Text className="text-center my-4">No more data to load</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Signature;
