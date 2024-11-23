import { Text, View } from "react-native";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
const orderDetails = () => {
  const { orderDetails } = useAppSelector((state: RootState) => state.order);
  return (
    <View className="flex p-4 ">
      <Text className="text-center text-xl font-bold">Order Details</Text>
      <View>
        <Text>Order Id: {orderDetails?.id}</Text>
        <Text>Recipient Name: {orderDetails?.recipientName}</Text>
        <Text>Phone: {orderDetails?.phone}</Text>
        <Text>Address {orderDetails?.address}</Text>
        <Text>Date To Deliver: {orderDetails?.dateToDeliver}</Text>
        <Text>Status: {orderDetails?.status} </Text>
        <Text>Delivery Subtype: {orderDetails?.deliverySubtypeId}</Text>
        <Text>Business Name:{orderDetails?.businessName}</Text>
        <Text>Rate:{orderDetails?.rate}</Text>
        <Text>Instructions:{orderDetails?.instructions}</Text>
        <Text>Payment: {orderDetails?.paymentStatus}</Text>
      </View>
    </View>
  );
};

export default orderDetails;
