import { useAppDispatch } from "@/store/hooks";
import { getAssignOrderDetails } from "@/store/slice/deliveryslice";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface propsType {
  price: string | number;
  name: string;
  status: string;
  paymentStatus: string;
  id: number;
}

const Signaturelist = ({
  price,
  name,
  status,
  paymentStatus,
  id,
}: propsType) => {
  //   const dispatch = useAppDispatch();
  //   const handleOrderDetails = async () => {
  //     try {
  //       const res = await dispatch(getAssignOrderDetails({ id }));
  //       if (res && res.type === "api/Delivery/GetAssignOrdersById/fulfilled") {
  //         console.log("SuccessFull order-details My Order");
  //         router.navigate("/(dynamic)/AssignOrderDetails");
  //       } else {
  //         console.log("Fail order-details My order");
  //       }
  //     } catch (error: any) {
  //       console.log("Fail order-details My order");
  //     }
  //   };

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={[styles.textStyle, styles.column]}>{name}</Text>
        <Text style={[styles.textStyle, styles.column]}>{status}</Text>
        <Text style={[styles.textStyle, styles.column]}>{price}$</Text>
        <Text
          style={[
            styles.textStyle,
            styles.column,
            {
              color: "#fff",
              backgroundColor: paymentStatus == "Paid" ? "green" : "red",
            },
          ]}
        >
          {paymentStatus}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Signaturelist;

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
    fontWeight: "700",
  },
  column: {
    flex: 1, // Ensure each column takes equal space
    textAlign: "center", // Align text in the center of its column
  },
});
