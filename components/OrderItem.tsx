import { PRIVATE_API } from "@/config";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getOrderDetails } from "@/store/slice/orderslice";
import { OrderType } from "@/types/admin";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const OrderItem = ({
  id,
  recipientName,
  phone,
  address,
  deliveryMethods,
  dateToDeliver,
  instructions,
  status,
  paymentStatus,
  deliverySubtypeId,
  name,
  rate,
  businessName,
  signatureImageUrl,
}: OrderType) => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleOrderDetails = async () => {
    if (user?.role !== "Admin") {
      try {
        const res = await dispatch(getOrderDetails({ id }));
        if (res && res.type === "api/Order/order-details/fulfilled") {
          console.log("Success: Order details retrieved.");
          router.navigate("/(dynamic)/OrderDetails");
        } else {
          console.log("Error: Failed to retrieve order details.");
        }
      } catch (error: any) {
        console.log("Error: An error occurred while fetching order details.");
      }
    }
  };

  return (
    <TouchableOpacity onPress={handleOrderDetails}>
      <View style={styles.container}>
        <Text style={[styles.textStyle, styles.column]}>{id}</Text>
        <Text style={[styles.textStyle, styles.column]}>{recipientName}</Text>
        <Text style={[styles.textStyle, styles.column]}>{phone}</Text>
        <Text style={[styles.textStyle, styles.column]}>{address}</Text>
        <Text style={[styles.textStyle, styles.column]}>{deliveryMethods}</Text>
        <Text style={[styles.textStyle, styles.column]}>{dateToDeliver}</Text>
        <Text style={[styles.textStyle, styles.column]}>{instructions}</Text>
        <Text
          style={[
            styles.textStyle,
            styles.column,
            { backgroundColor: status == "Delivered" ? "green" : "#fff" },
          ]}
        >
          {status}
        </Text>
        <Text style={[styles.textStyle, styles.column]}>{paymentStatus}</Text>
        <Text style={[styles.textStyle, styles.column]}>
          {deliverySubtypeId}
        </Text>
        <Text style={[styles.textStyle, styles.column]}>{name}</Text>
        <Text style={[styles.textStyle, styles.column]}>{rate}$</Text>
        <Text style={[styles.textStyle, styles.column]}>{businessName}</Text>
        {signatureImageUrl && (
          <Image
            style={{ width: 90, height: 90 }}
            source={{
              uri: "https://backend.rxexpresss.com" + signatureImageUrl,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  textStyle: {
    color: "#000",
    fontSize: 14,
  },
  column: {
    width: "7.14%", // Ensures 14 columns fit equally within the row (100% ÷ 14)
    textAlign: "center",
    paddingHorizontal: 4, // Adds spacing inside the column
  },
});
