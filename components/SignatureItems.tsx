import { OrderType } from "@/types/admin";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SignatureItem = ({
  id,
  recipientName,
  phone,
  address,
  dateToDeliver,
  status,
  paymentStatus,
  name,
  rate,
  businessName,
  signatureImageUrl,
}: OrderType) => {
  const [error, setError] = useState(false);
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={[styles.textStyle, styles.column]}>{id}</Text>
        <Text style={[styles.textStyle, styles.column]}>{recipientName}</Text>
        <Text style={[styles.textStyle, styles.column]}>{phone}</Text>
        <Text style={[styles.textStyle, styles.column]}>{address}</Text>
        <Text style={[styles.textStyle, styles.column]}>{name}</Text>
        <Text style={[styles.textStyle, styles.column]}>{dateToDeliver}</Text>
        <Text
          style={[
            styles.textStyle,
            styles.column,
            {
              color: "#fff",

              backgroundColor: status == "Delivered" ? "green" : "red",
              fontWeight: "bold",
              borderRadius: 20,
            },
          ]}
        >
          {status}
        </Text>
        <Text style={[styles.textStyle, styles.column]}>{rate}$</Text>
        <Text
          style={[
            styles.textStyle,
            styles.column,
            {
              color: "#fff",

              backgroundColor: paymentStatus == "Paid" ? "green" : "red",
              fontWeight: "bold",
              borderRadius: 20,
            },
          ]}
        >
          {paymentStatus}
        </Text>
        <Text style={[styles.textStyle, styles.column]}>{businessName}</Text>
        {signatureImageUrl && error ? (
          <Text style={[styles.textStyle, styles.column]}>Signature Image</Text>
        ) : (
          <Image
            style={{ width: 90, height: 90, alignSelf: "center" }}
            source={{
              uri: "https://backend.rxexpresss.com" + signatureImageUrl,
            }}
            accessibilityLabel="Error"
            onError={() => setError(true)}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SignatureItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  textStyle: {
    color: "#000",
    fontSize: 14,
  },
  column: {
    width: "9.14%", // Ensures 14 columns fit equally within the row (100% ÷ 14)
    textAlign: "center",
    paddingHorizontal: 4, // Adds spacing inside the column
  },
});
