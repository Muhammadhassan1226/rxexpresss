import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ErrorMessage: React.FC<any> = ({ message }) => (
  <View style={styles.errorContainer}>
    <MaterialCommunityIcons name="alert-circle" size={24} color="red" />
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffebee",
    borderRadius: 8,
    margin: 16,
  },
  errorText: {
    marginLeft: 8,
    color: "red",
    fontFamily: "Jakarta",
  },
});
