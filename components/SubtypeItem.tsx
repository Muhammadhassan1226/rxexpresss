import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";

const SubtypeItem = ({ item, handleDelete, handleEdit }: any) => {
  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.rate}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEdit(item.id)}
        >
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDelete(item.id)}
        >
          <EvilIcons name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubtypeItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  headerText: {
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },
  actionButton: {
    marginHorizontal: 5,
  },
});
