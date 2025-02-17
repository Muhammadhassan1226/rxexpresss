import { StyleSheet, Text, View } from "react-native";

interface PropsType {
  style?: object;
  id?: string;
  recipientName?: string;
  phone?: string;
  address?: string;
  deliveryMethods?: string;
  dateToDeliver?: string;
  instructions?: string;
  status?: string;
  paymentStatus?: string;
  deliverySubtypeId?: string;
  name?: string;
  rate?: string;
  businessName?: string;
  signatureImageUrl?: string;
}

const Header = ({
  style,
  id = "ID",
  recipientName = "Recipient Name",
  phone = "Phone",
  address = "Address",
  deliveryMethods = "Delivery Methods",
  dateToDeliver = "Date to Deliver",
  instructions = "Instructions",
  status = "Status",
  paymentStatus = "Payment Status",
  deliverySubtypeId = "Subtype ID",
  name = "Name",
  rate = "Rate",
  businessName = "Business Name",
  signatureImageUrl = "Signature Image",
}: PropsType) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.textStyle, styles.column, style]}>{id}</Text>
      <Text style={[styles.textStyle, styles.column, style]}>
        {recipientName}
      </Text>
      <Text style={[styles.textStyle, styles.column, style]}>{phone}</Text>
      <Text style={[styles.textStyle, styles.column, style]}>{address}</Text>
      <Text style={[styles.textStyle, styles.column, style]}>
        {deliveryMethods}
      </Text>
      <Text style={[styles.textStyle, styles.column, style]}>
        {dateToDeliver}
      </Text>
      <Text style={[styles.textStyle, styles.column, style]}>
        {instructions}
      </Text>
      <Text style={[styles.textStyle, styles.column, style]}>{status}</Text>
      <Text style={[styles.textStyle, styles.column, style]}>
        {paymentStatus}
      </Text>
      <Text style={[styles.textStyle, styles.column, style]}>
        {deliverySubtypeId}
      </Text>
      <Text style={[styles.textStyle, styles.column, style]}>{name}</Text>
      <Text style={[styles.textStyle, styles.column, style]}>{rate}</Text>
      <Text style={[styles.textStyle, styles.column, style]}>
        {businessName}
      </Text>
      <Text style={[styles.textStyle, styles.column, style]}>
        {signatureImageUrl}
      </Text>
    </View>
  );
};

export default Header;

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
    width: "7.14%", // Ensures 14 columns fit equally within the row (100% ÷ 14)
    textAlign: "center", // Centers the text within its column
    paddingHorizontal: 4, // Adds spacing inside each column
  },
});
