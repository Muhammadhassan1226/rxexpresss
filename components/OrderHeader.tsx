import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface PropsType {
  style?: object;
}
const OrderHeader = ({ style }: PropsType) => {
  return (
    <View className="flex flex-row justify-around py-4 mt-4 bg-black">
      <Text style={[styles.textStyle, style]}>Recipient Name</Text>
      <Text style={[styles.textStyle, style]}>Status</Text>
      <Text style={[styles.textStyle, style]}>Price</Text>
      <Text style={[styles.textStyle, style]}>Payment Status</Text>
    </View>
  );
};

export default OrderHeader;

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: "bold",
    color: "#fff",
  },
});
