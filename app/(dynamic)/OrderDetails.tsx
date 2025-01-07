import { Text, View, Pressable, ScrollView } from "react-native";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
const orderDetails = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showqr, setshowqr] = React.useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { orderDetails } = useAppSelector((state: RootState) => state.order);
  return (
    <>
      <View className="flex p-4 pb-24 mt-10">
        <Pressable onPress={() => router.back()}>
          <Text className="text-black-500 font-bold text-lg">Back</Text>
        </Pressable>
        {/* <Link
          className="self-start ml-5 px-5 py-2 rounded border-2 border-blue-500"
          href="/OrderDetails"
        >
          <Text className="text-black-500 font-bold text-lg">Back</Text>
        </Link> */}
        {/* <Link
          className="self-start ml-5 px-5 py-2 rounded border-2 border-blue-500"
          href="/orderlist"
          as
          child
        >
          <Text className="text-black-500 font-bold text-lg">Back</Text>
        </Link> */}
        <Text className="text-center text-lg font-bold">Order Details</Text>
        <ScrollView>
          <View className="text-md">
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

          <View className="flex items-center justify-center mt-20 w-full">
            {showqr ? (
              <View className="flex flex-row">
                <View>
                  <Text className="my-2">
                    Order Id: {""} {""} {""} {orderDetails?.id}
                  </Text>
                  <Text className="my-2">
                    Recipient Name: {""} {""} {""} {orderDetails?.recipientName}
                  </Text>
                  <Text className="my-2 w-40 text-left">
                    Address: {""} {""} {""} {orderDetails?.address}
                  </Text>
                </View>
                <QRCode value={JSON.stringify(orderDetails)} size={180} />
              </View>
            ) : (
              ""
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default orderDetails;
