import { StyleSheet, Text, View } from "react-native";

const UserHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.textStyle, styles.column]}>Name</Text>
      <Text style={[styles.textStyle, styles.column]}>Email</Text>
      <Text style={[styles.textStyle, styles.column]}>Phone</Text>
      <Text style={[styles.textStyle, styles.column]}>Business Name</Text>
      <Text style={[styles.textStyle, styles.column]}>Doing Business As</Text>
      <Text style={[styles.textStyle, styles.column]}>Address</Text>
      <Text style={[styles.textStyle, styles.column]}>City</Text>
      <Text style={[styles.textStyle, styles.column]}>State</Text>
      <Text style={[styles.textStyle, styles.column]}>Zipcode</Text>
      <Text style={[styles.textStyle, styles.column]}>Apt</Text>
      <Text style={[styles.textStyle, styles.column]}>Facality</Text>
      <Text style={[styles.textStyle, styles.column]}>Role</Text>
    </View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "black",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  column: {
    width: "8.4%", // Ensures 14 columns fit equally within the row (100% ÷ 14)
    textAlign: "center", // Centers the text within its column
    paddingHorizontal: 4, // Adds spacing inside each column
  },
});
