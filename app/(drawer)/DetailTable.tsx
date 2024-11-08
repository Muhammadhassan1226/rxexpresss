import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SaleItem from "@/components/SaleItem";
import { Searchbar } from "react-native-paper";
const DetailTable = () => {
  const saleItem = [1, 2, 3, 4, 5];
  const [search, setSearch] = useState("");
  return (
    <View>
      <Searchbar placeholder="Search" onChangeText={setSearch} value={search} />
      <View className="flex flex-row justify-between">
        <Text style={styles.titleStyle}>#</Text>
        <Text style={styles.titleStyle}>Customer</Text>
        <Text style={styles.titleStyle}>Product</Text>
        <Text style={styles.titleStyle}>Price</Text>
        <Text style={styles.titleStyle}>Status</Text>
      </View>
      {saleItem.map(() => {
        return <SaleItem />;
      })}
    </View>
  );
};

export default DetailTable;

const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: "bold",
  },
});
