import { StyleSheet, Text, View } from "react-native";

interface propsType {
  businessName: string | number;
  name: string;
  phone: string;
  state: string;
  email: string;
  doingBussinessAs: string;
  address: string;
  city: string;
  zipcode: string | number;
  apt?: string;
  facility: string | null;
  role?: string | null;
}

const UserItem = ({
  businessName,
  name,
  phone,
  state,
  email,
  doingBussinessAs,
  address,
  city,
  zipcode,
  apt,
  facility,
  role,
}: propsType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.column}>{name}</Text>
      <Text style={styles.column}>{phone}</Text>
      <Text style={styles.column}>{businessName}</Text>
      <Text style={styles.column}>{state}</Text>
      <Text style={styles.column}>{email}</Text>
      <Text style={styles.column}>{doingBussinessAs}</Text>
      <Text style={styles.column}>{address}</Text>
      <Text style={styles.column}>{city}</Text>
      <Text style={styles.column}>{zipcode}</Text>
      <Text style={styles.column}>{apt}</Text>
      <Text style={styles.column}>{facility}</Text>
      <Text style={styles.column}>{role}</Text>
    </View>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  column: {
    width: "7.14%", // Ensures 12 columns fit equally within 100% of the row
    paddingHorizontal: 4, // Optional: Add padding for spacing
    textAlign: "center", // Center text within the column
    fontSize: 14,
    color: "#000",
  },
});
