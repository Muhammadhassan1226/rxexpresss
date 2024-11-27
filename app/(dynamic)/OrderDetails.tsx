import { Text, View } from "react-native";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import CustomButton from "@/components/CustomButton";
const orderDetails = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showqr, setshowqr] = React.useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { orderDetails } = useAppSelector((state: RootState) => state.order);
  return (
    <>
      <View className="flex p-4 mt-10">
        <Text className="text-center text-[15px] font-bold">Order Details</Text>
        <View className="text-[5rem]">
          <Text className="my-2">
            Order Id: {""} {""} {""} {orderDetails?.id}
          </Text>
          <Text className="my-2">
            Recipient Name: {""} {""} {""} {orderDetails?.recipientName}
          </Text>
          <Text className="my-2">
            Phone: {""} {""} {""} {orderDetails?.phone}
          </Text>
          <Text className="my-2">
            Address: {""} {""} {""} {orderDetails?.address}
          </Text>
          <Text className="my-2">
            Date To Deliver: {""} {""} {""} {orderDetails?.dateToDeliver}
          </Text>
          <Text className="my-2">
            Status: {""} {""} {""} {orderDetails?.status}{" "}
          </Text>
          <Text className="my-2">
            Delivery Subtype: {""} {""} {""} {orderDetails?.deliverySubtypeId}
          </Text>
          <Text className="my-2">
            Business Name: {""} {""} {""} {orderDetails?.businessName}
          </Text>
          <Text className="my-2">
            Rate: {""} {""} {""} {orderDetails?.rate}
          </Text>
          <Text className="my-2">
            Instructions: {""} {""} {""} {orderDetails?.instructions}
          </Text>
          <Text className="my-2">
            Payment: {""} {""} {""} {orderDetails?.paymentStatus}
          </Text>
        </View>
        <CustomButton
          title={"Show Qr Code"}
          textVariant="primary"
          onPress={() => setshowqr(!showqr)}
          className="mt-4"
        />
      </View>
      <View className="flex items-center justify-center mt-20 w-full">
        {showqr ? (
          <QRCode value={JSON.stringify(orderDetails)} size={280} />
        ) : (
          ""
        )}
      </View>
    </>
  );
};

export default orderDetails;
