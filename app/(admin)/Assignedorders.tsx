import { useState, useEffect, useCallback } from "react";
import {
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import Spinner from "react-native-loading-spinner-overlay";
import OrderItem from "@/components/OrderItem";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import { AssignedOrders } from "@/store/slice/adminslice";

const Assignedord = () => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { AssignedOrders: orders, loading } = useAppSelector(
    (state: RootState) => state.admin,
  );

  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [search, setSearch] = useState("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchOrders = useCallback(
    async (pageNum: number, shouldReset = false) => {
      try {
        const result = await dispatch(
          AssignedOrders({
            search,
            page: pageNum,
            pageSize,
          }),
        ).unwrap();

        // Check if we've reached the end of the data
        const totalReceived = shouldReset
          ? result.orders.length
          : (orders?.orders?.length || 0) + result.orders.length;

        setHasMore(totalReceived < (result.totalOrders || 0));

        // Update page only if we received data
        if (result.orders.length > 0) {
          setPage(pageNum + 1);
        }
      } catch (error) {
        console.error("Error fetching Assigned orders:", error);
      } finally {
        setIsFetchingMore(false);
        setIsInitialLoad(false);
      }
    },
    [dispatch, search, pageSize, orders?.orders?.length],
  );

  // Initial load and refresh
  useEffect(() => {
    if (isFocused) {
      setIsInitialLoad(true);
      setHasMore(true);
      setPage(1);
      fetchOrders(1, true);
    }
  }, [isFocused, search]);

  // Handle search
  const handleSearch = useCallback(() => {
    setIsInitialLoad(true);
    setHasMore(true);
    setPage(1);
    fetchOrders(1, true);
  }, [fetchOrders]);

  // Handle load more
  const loadMoreOrders = useCallback(async () => {
    if (
      isFetchingMore ||
      !hasMore ||
      isInitialLoad ||
      loading ||
      !orders?.orders ||
      orders.orders.length === 0
    )
      return;

    setIsFetchingMore(true);
    await fetchOrders(page, false);
  }, [
    isFetchingMore,
    hasMore,
    isInitialLoad,
    loading,
    orders?.orders,
    page,
    fetchOrders,
  ]);

  const renderFooter = () => {
    if (!isFetchingMore) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <Spinner
        visible={isInitialLoad && loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <StatusBar />
      <Text className="font-bold text-center text-xl pb-4">
        All Assigned Orders From Admin
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
            name={item.recipientName}
            price={item?.rate}
            status={item.status}
            paymentStatus={item.paymentStatus}
          />
        )}
        ListEmptyComponent={
          !isInitialLoad && !loading ? (
            <Text className="text-center my-4">No records found</Text>
          ) : null
        }
        onEndReached={loadMoreOrders}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        // Disable scroll while loading initial data
        scrollEnabled={!isInitialLoad}
      />
    </SafeAreaView>
  );
};

export default Assignedord;
