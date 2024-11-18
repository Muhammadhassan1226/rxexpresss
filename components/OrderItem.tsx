import { StyleSheet, Text, View } from "react-native";

interface propsType {
  price: string | number;
  name: string;
  status: string;
  paymentStatus: string;
}
const OrderItem = ({ price, name, status, paymentStatus }: propsType) => {
  return (
    <View className="flex flex-row justify-around py-4">
      <Text style={[styles.textStyle]}>{price}</Text>
      <Text style={[styles.textStyle]}>{name}</Text>
      <Text style={[styles.textStyle]}>{status}</Text>
      <Text style={[styles.textStyle]}>{paymentStatus}</Text>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  textStyle: {
    color: "#000",
  },
});
