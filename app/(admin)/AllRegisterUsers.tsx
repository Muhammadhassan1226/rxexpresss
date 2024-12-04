import { Text, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { getUsers } from "@/store/slice/adminslice";
import Spinner from "react-native-loading-spinner-overlay";
import Header from "@/components/Header";
import UserItem from "@/components/UserItem";
import { useIsFocused } from "@react-navigation/native";

const User = () => {
  const users = useAppSelector((state: RootState) => state.admin.users);
  const loading = useAppSelector((state: RootState) => state.admin.loading);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused(); // Detect if the page is in focus
  const handleUserOrder = async () => {
    try {
      const res = await dispatch(getUsers());
      if (res && res.type === "admin/users-count/fulfilled") {
        console.log("SuccessFull All User");
      } else {
        console.log("Fail All User My order");
      }
    } catch (error: any) {
      console.log("Fail All User My order");
    }
  };
  useEffect(() => {
    if (isFocused) {
      handleUserOrder();
    }
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
      <Header first="Name" second="Phone" third="Business Name" forth="State" />
      {users.length === 0 && (
        <Text className="text-center my-4">No record Found</Text>
      )}
      <FlatList
        data={users}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item, index }) => {
          return (
            <UserItem
              name={item.name}
              businessName={item.businessName}
              phone={item.phone}
              state={item.state}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default User;
