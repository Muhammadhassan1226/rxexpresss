import { Text, StatusBar, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { getUsers } from "@/store/slice/adminslice";
import Spinner from "react-native-loading-spinner-overlay";
import Header from "@/components/Header";
import UserItem from "@/components/UserItem";
import { useIsFocused } from "@react-navigation/native";

import { View } from "react-native";
const User = () => {
  const users = useAppSelector((state: RootState) => state.admin.users) || [];
  const loading = useAppSelector((state: RootState) => state.admin.loading);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const handleUserOrder = async () => {
    try {
      const res = await dispatch(getUsers());
      if (res?.type === "admin/users-count/fulfilled") {
        console.log("Successfully Fetched All Users");
      } else {
        console.log("Failed to Fetch All Users");
      }
    } catch (error) {
      console.log("Error Fetching Users:", error);
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
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {Array.isArray(users) && users.length === 0 ? (
          <Text className="text-center my-4">No records found</Text>
        ) : (
          <FlatList
            ListHeaderComponent={() => (
              <Header
                id="Name"
                recipientName="Phone"
                phone="Business Name"
                address="State"
                deliveryMethods="Email"
                dateToDeliver="Doing Business As"
                instructions="Address"
                status="City"
                paymentStatus="Zipcode"
                deliverySubtypeId="Apt"
              />
            )}
            showsVerticalScrollIndicator={false}
            data={users}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            renderItem={({ item }) => (
              <UserItem
                name={item.name}
                businessName={item.businessName}
                phone={item.phone}
                state={item.state}
                email={item.email}
                doingBussinessAs={item.doingBusinessAs}
                address={item.addrress}
                city={item.city}
                zipcode={item.zipcode}
                apt={item.apt}
                facility={item.facility}
                role={item.role}
              />
            )}
            ListEmptyComponent={() => (
              <Text className="text-center my-4">No records found</Text>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default User;
