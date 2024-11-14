import React, { useEffect, useState } from "react";
import {
  View,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import CardItem from "@/components/CardItem";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PRIVATE_API } from "@/config";

interface OrderCount {
  pharmacy: string;
  totalOrders: number;
  pendingOrders: number;
  readyForPickupOrders: number;
}

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [orderData, setOrderData] = useState<OrderCount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    user,
    loading: authLoading,
    error: authError,
  } = useAppSelector((state) => state.auth);

  const fetchOrderCount = async () => {
    try {
      const response = await PRIVATE_API.get("api/Order/pharmacy-order-count");
      setOrderData(response.data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch order data",
      );
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/sign-in");
      return;
    }
    fetchOrderCount();
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrderCount();
    setRefreshing(false);
  };

  if (authLoading || loading) return <LoadingScreen />;
  if (authError || error) {
    console.log(error);
    return null;
  }
  if (!orderData) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.greeting}>Hi {user?.userName}</Text>
        <View style={styles.cardsContainer}>
          <CardItem
            title="Order Created"
            orderNo={orderData.totalOrders}
            subTitle="Orders Created"
          />
          <CardItem
            title="Ready For Pickup"
            orderNo={orderData.readyForPickupOrders}
            subTitle="Waiting"
          />
          <CardItem
            title="Pending"
            orderNo={orderData.pendingOrders}
            subTitle="Pending"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  greeting: {
    fontSize: 24,
    fontFamily: "Jakarta-Bold",
    padding: 16,
  },
  cardsContainer: {
    padding: 8,
  },
});

export default Home;
