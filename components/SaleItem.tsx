import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SaleItem = () => {
  return (
    <View className="flex flex-row justify-between">
      <Text style={styles.titleStyle}>item no</Text>
      <Text style={styles.textStyle}>Customer</Text>
      <Text style={styles.titleStyle}>Product</Text>
      <Text style={styles.textStyle}>Price</Text>
      <Text style={styles.textStyle}>Status</Text>
    </View>
  );
};

export default SaleItem;

const styles = StyleSheet.create({
  titleStyle: {
    color: "blue",
  },
  textStyle: {
    color: "black",
  },
});
