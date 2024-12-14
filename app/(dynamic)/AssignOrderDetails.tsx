import { Text, View, Pressable, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import {
  updateOrderStatusDelivery,
  saveOrderSignature,
} from "@/store/slice/deliveryslice";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import { Button } from "react-native";

const AssignOrdersDetails = () => {
  const dispatch = useAppDispatch();
  const [selectedType, setselectedType] = useState("");
  const [imageData, setImageData] = useState<string>("");
  const { orderAssignDetails } = useAppSelector(
    (state: RootState) => state.delivery,
  );
  // Submit the function
  const onSubmit = async () => {
    try {
      if (imageData !== "") {
        await dispatch(
          saveOrderSignature({
            orderId: orderAssignDetails.id,
            signature: imageData,
          }),
        );
        console.log("Successfully saved signature");
        router.back();
      } else {
        await dispatch(
          updateOrderStatusDelivery({
            orderId: orderAssignDetails.id,
            newStatus: selectedType,
          }),
        );
        console.log("Successfully updated status");
      }
      router.back();
    } catch (error) {
      console.log("Error____", error);
      alert("Failed to update order status");
    }
  };
  // Refernce Signature
  const ref = useRef<SignatureViewRef>(null);
  // Handle signature
  const handleSignature = async (signature: any) => {
    ref.current?.readSignature();
    console.log("Image 64", imageData);
  };
  // Clear the signature
  const handleClear = () => {
    ref.current?.clearSignature();
    setImageData("");
    console.log("clear success!");
  };

  return (
    <View className="flex-1 p-4 mt-10 bg-success-400">
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
        {/* Update status */}
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
        {/* Signature */}
        <View style={{ height: 200 }}>
          <SignatureScreen
            ref={ref}
            onOK={(img) => setImageData(img)}
            descriptionText="Sign"
            clearText="Clear"
            confirmText="Save"
            imageType="image/png"
          />
        </View>
        <View style={styles.row}>
          <Button title="Clear" onPress={handleClear} />
          <Button title="Confirm" onPress={handleSignature} />
        </View>
      </View>
      <CustomButton
        title="Submit"
        textVariant="primary"
        onPress={onSubmit}
        className="mt-4"
      />
    </View>
  );
};

export default AssignOrdersDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});
