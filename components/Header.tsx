import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface PropsType {
  style?: object;
  first?: string;
  second?: string;
  third?: string;
  forth?: string;
  fifth?: string;
}
const Header = ({ style, first, second, third, forth, fifth }: PropsType) => {
  return (
    <View style={styles.container} className="py-4 mt-4 bg-black">
      <Text style={[styles.textStyle, styles.column, style]}>{first}</Text>
      <Text style={[styles.textStyle, styles.column, style]}>{second}</Text>
      <Text style={[styles.textStyle, styles.column, style]}>{third}</Text>
      <Text style={[styles.textStyle, styles.column, style]}>{forth}</Text>
      <Text style={[styles.textStyle, styles.column, style]}>{fifth}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribute columns evenly
    alignItems: "center", // Vertically align text
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1, // Optional: To separate rows
    borderColor: "#ddd", // Optional: Border color
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14, // Adjust font size as needed
  },
  column: {
    flex: 1, // Ensure each column takes equal space
    textAlign: "center", // Align text in the center of its column
  },
});
