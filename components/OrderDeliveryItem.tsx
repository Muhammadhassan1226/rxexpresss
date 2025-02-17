import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAssignOrderDetails } from "@/store/slice/deliveryslice";
import { getOrderDetails } from "@/store/slice/orderslice";
import { OrderType } from "@/types/admin";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const OrderDeliveryItem = ({
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
    try {
      const res = await dispatch(getAssignOrderDetails({ id }));
      if (res && res.type === "api/Delivery/GetAssignOrdersById/fulfilled") {
        console.log("SuccessFull order-details My Order");
        router.navigate("/(dynamic)/AssignOrderDetails");
      } else {
        console.log("Fail order-details My order");
      }
    } catch (error: any) {
      console.log("Fail order-details My order");
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

export default OrderDeliveryItem;

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
