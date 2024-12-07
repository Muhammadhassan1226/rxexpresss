import { Text, View, Pressable } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { updateOrderStatusDelivery } from "@/store/slice/deliveryslice";

const AssignOrdersDetails = () => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showqr, setshowqr] = React.useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { orderAssignDetails } = useAppSelector(
    (state: RootState) => state.delivery,
  );
  const [selectedType, setselectedType] = useState("");
  const onSubmit = async () => {
    try {
      await dispatch(
        updateOrderStatusDelivery({
          orderId: orderAssignDetails.id,
          newStatus: selectedType,
        }),
      );
      console.log("Successfully updated status");
    } catch (error) {
      console.log("Error____", error);
    }
  };
  return (
    <>
      <View className="flex p-4 mt-10">
        <Pressable onPress={() => router.back()}>
          <Text className="text-black-500 font-bold text-lg">Back</Text>
        </Pressable>
        <Text className="text-center text-lg font-bold">Order Details</Text>
        <View className="text-md">
          <Text className="my-2">
            Order Id: {""} {""} {""} {orderAssignDetails?.id}
          </Text>
          <Text className="my-2">
            Recipient Name: {""} {""} {""} {orderAssignDetails?.recipientName}
          </Text>
          <Text className="my-2">
            Phone: {""} {""} {""} {orderAssignDetails?.phone}
          </Text>
          <Text className="my-2">
            Address: {""} {""} {""} {orderAssignDetails?.address}
          </Text>
          <Text className="my-2">
            Date To Deliver: {""} {""} {""} {orderAssignDetails?.dateToDeliver}
          </Text>
          <Text className="my-2">
            Status: {""} {""} {""} {orderAssignDetails?.status}{" "}
          </Text>
          <Text className="my-2">
            Delivery Subtype: {""} {""} {""}{" "}
            {orderAssignDetails?.deliverySubtypeId}
          </Text>
          <Text className="my-2">
            Instructions: {""} {""} {""} {orderAssignDetails?.instructions}
          </Text>
          <Text className="my-2">
            Payment: {""} {""} {""} {orderAssignDetails?.paymentStatus}
          </Text>
          <View className="">
            <Text className="my-2">Update Status:</Text>
            <Picker
              className="w-8"
              selectedValue={selectedType}
              onValueChange={(text) => setselectedType(text)}
            >
              <Picker.Item label="Ready for pickup" value="Ready for pickup" />
              <Picker.Item label="Out For Delivery" value="Out For Delivery" />
              <Picker.Item label="Delivered" value="Delivered" />
            </Picker>
          </View>
        </View>
        <CustomButton
          title={"Submit"}
          textVariant="primary"
          onPress={onSubmit}
          className="mt-4"
        />
      </View>
      <View className="flex items-center justify-center mt-20 w-full"></View>
    </>
  );
};

export default AssignOrdersDetails;
