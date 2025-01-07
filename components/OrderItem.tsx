import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getOrderDetails } from "@/store/slice/orderslice";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface propsType {
  price: string | number;
  name: string;
  status: string;
  paymentStatus: string;
  id: number;
}

const OrderItem = ({ price, name, status, paymentStatus, id }: propsType) => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const handleOrderDetails = async () => {
    if (user?.role !== "Admin") {
      try {
        const res = await dispatch(getOrderDetails({ id }));
        if (res && res.type === "api/Order/order-details/fulfilled") {
          console.log("SuccessFull order-details My Order");
          router.navigate("/(dynamic)/OrderDetails");
        } else {
          console.log("Fail order-details My order");
        }
      } catch (error: any) {
        console.log("Fail order-details My order");
      }
    }
  };

  return (
    <TouchableOpacity onPress={handleOrderDetails}>
      <View style={styles.container}>
        <Text style={[styles.textStyle, styles.column]}>{id}</Text>
        <Text style={[styles.textStyle, styles.column]}>{name}</Text>
        <Text style={[styles.textStyle, styles.column]}>{status}</Text>
        <Text style={[styles.textStyle, styles.column]}>{price}$</Text>
        <Text style={[styles.textStyle, styles.column]}>{paymentStatus}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribute columns evenly
    alignItems: "center", // Vertically align text
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1, // Optional: To separate rows
    borderColor: "#ddd", // Optional: Border color
  },
  textStyle: {
    color: "#000",
    fontSize: 14, // Adjust font size as needed
  },
  column: {
    flex: 1, // Ensure each column takes equal space
    textAlign: "center", // Align text in the center of its column
  },
});
