import React from "react";
import { View, Text, Alert } from "react-native";
import { RNCamera } from "react-native-camera";

interface QRData {
  data: string;
}

const Qrcode = () => {
  const handleBarcodeScan = ({ data }: QRData) => {
    try {
      const orderData = JSON.parse(data);
      Alert.alert("Scanned Order Details:", JSON.stringify(orderData));
    } catch (error: any) {
      Alert.alert("Invalid QR Code", "This QR code could not be processed.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={{ flex: 1 }}
        onBarCodeRead={handleBarcodeScan}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>Scan the QR Code</Text>
        </View>
      </RNCamera>
    </View>
  );
};

export default Qrcode;
