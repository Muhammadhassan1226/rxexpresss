import { View, Text, Alert } from "react-native";
import { CameraView } from "expo-camera";
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
      <CameraView style={{ flex: 1 }} onBarcodeScanned={handleBarcodeScan}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>Scan the QR Code</Text>
        </View>
      </CameraView>
    </View>
  );
};

export default Qrcode;
