import { Text, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { getUsers } from "@/store/slice/adminslice";
import OrderItem from "@/components/OrderItem";
import OrderHeader from "@/components/OrderHeader";
import Spinner from "react-native-loading-spinner-overlay";
import React from "react";

const User = () => {
  const users = useAppSelector((state: RootState) => state.admin.users);
  const loading = useAppSelector((state: RootState) => state.admin.loading);
  const dispatch = useAppDispatch();
  console.log("Loading", loading);
  const handleUserOrder = async () => {
    try {
      const res = await dispatch(getUsers());
      if (res && res.type === "admin/users-count/fulfilled") {
        console.log("SuccessFull getUserOrders My Order");
      } else {
        console.log("Fail getUserOrders My order");
      }
    } catch (error: any) {
      console.log("Fail getUserOrders My order");
    }
  };
  useEffect(() => {
    handleUserOrder();
  }, [isFocused]);
  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <StatusBar />
      <Text className="font-bold text-center text-xl pb-4">All Users</Text>
      <OrderHeader />
      {users.length === 0 && (
        <Text className="text-center my-4">No record Found</Text>
      )}
      {/* <FlatList
        data={users}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item, index }) => {
          return (
            <OrderItem
              name={item.name}
              price={item.businessName}
              status={item.phone}
              paymentStatus={item.role}
            />
          );
        }}
      /> */}

      {users.map((item) => (
        <Text>{item.name}</Text>
      ))}
    </SafeAreaView>
  );
};

export default User;
