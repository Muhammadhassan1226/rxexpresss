import { useEffect, useState } from "react";
import {
  Text,
  StatusBar,
  FlatList,
  View,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddSubtype, SubtypeItem } from "@/components";
import { PUBLIC_API } from "@/config";

interface deliveryType {
  id?: string;
  name: string;
  rate: string;
  order?: any;
}
const DeliverySubtype = () => {
  const [subType, setsubType] = useState("");
  const [rate, setRate] = useState("");
  const [editSubType, setEditSubType] = useState("");
  const [editId, setEditId] = useState("");
  const [editRate, setEditRate] = useState("");
  const [data, setData] = useState<deliveryType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  // Create Delivery Subtype
  const createSubtype = async (id: any) => {
    const data = {
      name: subType,
      rate: rate,
    };
    try {
      const res = await PUBLIC_API.post(
        "api/DeliverySubtype/CreateDeliverySubtype",
        data
      );
      Alert.alert("Successfull", res.data.message, [
        {
          text: "Ok",
          onPress: () => getDeliverySubType(),
        },
      ]);
    } catch (error) {
      Alert.alert("Subtype already exist");
    }
    setsubType("");
    setRate("");
  };

  // Delete Delivery Subtype

  const handleDelete = async (id: any) => {
    try {
      const res = await PUBLIC_API.delete(
        `api/DeliverySubtype/DeleteDeliverySubtype?id=${id}`
      );
      Alert.alert("Message", res.data.message, [
        {
          text: "OK",
          onPress: () => getDeliverySubType(),
        },
      ]);
    } catch (error) {
      Alert.alert("Something went wrong please try again");
    }
  };

  // Edit Delivery Subtype
  const handleEdit = (id: string) => {
    setEditId(id);
    setEditModalVisible(true);
    let filter = data.filter((item) => item.id == id);
    filter.map((item) => {
      setEditRate(item.rate);
      setEditSubType(item.name);
    });
  };

  //  Edit function
  const subEditSubtype = async () => {
    const data = {
      name: editSubType,
      rate: editRate,
    };
    try {
      const res = await PUBLIC_API.put(
        `api/DeliverySubtype/UpdateDeliverySubtype?id=${editId}`,
        data
      );
      Alert.alert("Successfull", res.data.message, [
        {
          text: "Ok",
          onPress: () => getDeliverySubType(),
        },
      ]);
    } catch (error) {
      Alert.alert("Subtype already exist");
    }
    setEditModalVisible(false);
    setEditId("");
    setEditSubType("");
    setEditRate("");
  };

  const getDeliverySubType = async () => {
    const res = await PUBLIC_API.get("api/DeliverySubtype/GetDeliverySubtypes");
    setData(res.data);
  };
  useEffect(() => {
    getDeliverySubType();
  }, []);

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      {/* <Spinner
        visible={isInitialLoading && loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      /> */}
      <StatusBar />
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AddSubtype
              subType={editSubType}
              setSubType={setEditSubType}
              onPress={subEditSubtype}
              title="Edit Subtype"
              placeholder="Delivery subtpe"
              rate={editRate}
              setRate={setEditRate}
            />
          </View>
        </View>
      </Modal>
      <Text className="font-bold text-center text-xl py-4">
        Delivery Subtype
      </Text>
      <AddSubtype
        subType={subType}
        setSubType={setsubType}
        onPress={createSubtype}
        title="Add Subtype"
        placeholder="Delivery subtpe"
        rate={rate}
        setRate={setRate}
      />
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.headerText]}>Id</Text>
        <Text style={[styles.cell, styles.headerText]}>Name</Text>
        <Text style={[styles.cell, styles.headerText]}>Rate</Text>
        <Text style={[styles.cell, styles.headerText]}>Actions</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <SubtypeItem
            item={item}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
        keyExtractor={(item: any) => item.id}
      />
    </SafeAreaView>
  );
};

export default DeliverySubtype;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  card: {
    borderRadius: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e9ecef",
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 30,
  },
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
});
