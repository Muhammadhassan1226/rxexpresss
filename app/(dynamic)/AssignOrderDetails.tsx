import { Text, View, Pressable } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import React, { useState, useRef } from "react";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
// import { Canvas } from "@react-native-community/art";
import SignatureCapture from "react-native-signature-capture";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import {
  updateOrderStatusDelivery,
  saveOrderSignature,
} from "@/store/slice/deliveryslice";

const SignaturePad = ({ onSignature }: any) => {
  const [path, setPath] = useState<any>("");
  const [currentPoints, setCurrentPoints] = useState<any>([]);

  const onGestureEvent = (event: any) => {
    const { x, y } = event.nativeEvent;
    const newPoints = [...currentPoints, { x, y }];
    setCurrentPoints(newPoints);

    // Create SVG path
    const pathData = newPoints.reduce((acc, point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      return `${acc} L ${point.x} ${point.y}`;
    }, "");

    setPath(pathData);
    onSignature(pathData);
  };

  const clearSignature = () => {
    setPath("");
    setCurrentPoints([]);
    onSignature("");
  };

  return (
    <View
      style={{
        height: 200,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "white",
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View style={{ flex: 1 }}>
            <Svg
              height="100%"
              width="100%"
              style={{ backgroundColor: "transparent" }}
            >
              <Path d={path} stroke="black" strokeWidth="2" fill="none" />
            </Svg>
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
      <CustomButton
        title="Clear"
        textVariant="secondary"
        onPress={clearSignature}
        className="absolute bottom-2 right-2"
      />
    </View>
  );
};

const AssignOrdersDetails = () => {
  const dispatch = useAppDispatch();
  const { orderAssignDetails } = useAppSelector(
    (state: RootState) => state.delivery,
  );
  const [selectedType, setselectedType] = useState("");
  const [signature, setSignature] = useState("");

  const handleSignature = (signaturePath: any) => {
    setSignature(signaturePath);
  };

  const signatureRef = useRef<SignatureCapture | null>(null);

  // Define the save function
  const saveSign = (): void => {
    signatureRef.current?.saveImage();
  };

  // Define the reset function
  const resetSign = (): void => {
    signatureRef.current?.resetImage();
    setSignature("");
  };

  // Define the save event handler with proper typing
  const _onSaveEvent = (result: { encoded: string }): void => {
    setSignature(result.encoded);
  };

  const onSubmit = async () => {
    try {
      if (selectedType === "Delivered" && !signature) {
        alert("Please provide a signature for delivery confirmation");
        return;
      }

      await dispatch(
        updateOrderStatusDelivery({
          orderId: orderAssignDetails.id,
          newStatus: selectedType,
        }),
      );

      if (selectedType === "Delivered" && signature) {
        await dispatch(
          saveOrderSignature({
            orderId: orderAssignDetails.id,
            signature: signature, // This will be SVG path data
          }),
        );
      }

      console.log("Successfully updated status and saved signature");
      router.back();
    } catch (error) {
      console.log("Error____", error);
      alert("Failed to update order status");
    }
  };

  return (
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

        {selectedType === "Delivered" && (
          <View style={{ flex: 1, marginTop: 15 }}>
            <Text className="my-2">Signature:</Text>
            <SignatureCapture
              style={{
                flex: 1,
                height: 200,
                borderColor: "#000033",
                borderWidth: 1,
              }}
              ref={signatureRef}
              onSaveEvent={_onSaveEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={"portrait"}
            />
            <View className="flex-row justify-end space-x-2 mt-2">
              <CustomButton
                title="Reset"
                textVariant="secondary"
                onPress={resetSign}
                className="px-4"
              />
              <CustomButton
                title="Save"
                textVariant="primary"
                onPress={saveSign}
                className="px-4"
              />
            </View>
          </View>
        )}
      </View>

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

      {selectedType === "Delivered" && (
        <View className="mt-4">
          <Text className="my-2">Signature:</Text>
          <SignaturePad onSignature={handleSignature} />
        </View>
      )}

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
