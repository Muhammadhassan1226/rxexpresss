import { StyleSheet, Text, View } from "react-native";
interface propsType {
  businessName: string | number;
  name: string;
  phone: string;
  state: string;
}

const UserItem = ({ businessName, name, phone, state }: propsType) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.textStyle, styles.column]}>{name}</Text>
      <Text style={[styles.textStyle, styles.column]}>{phone}</Text>
      <Text style={[styles.textStyle, styles.column]}>{businessName}$</Text>
      <Text style={[styles.textStyle, styles.column]}>{state}</Text>
    </View>
  );
};

export default UserItem;

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
    color: "#000",
    fontSize: 14, // Adjust font size as needed
  },
  column: {
    flex: 1, // Ensure each column takes equal space
    textAlign: "center", // Align text in the center of its column
  },
});
