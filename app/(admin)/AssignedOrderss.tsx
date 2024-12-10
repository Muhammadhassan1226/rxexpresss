import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { Deliveryusers, getOrder } from "@/store/slice/adminslice";
import { assignOrderToDelivery } from "@/store/slice/adminslice";

interface AssignOrderDropdownProps {
  onAssignSuccess?: () => void;
}

const AssignOrderDropdown: React.FC<AssignOrderDropdownProps> = ({
  onAssignSuccess,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const deliveryUsers = useAppSelector(
    (state: RootState) => state.admin.Deliveryusers,
  );
  const orders = useAppSelector(
    (state: RootState) => state.admin.AllOrdersWithoutDelivered,
  );
  const loading = useAppSelector((state: RootState) => state.admin.loading);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      await Promise.all([
        dispatch(Deliveryusers()),
        dispatch(getOrder({ page: 1, pageSize: 50 })), // Adjust page size as needed
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to load initial data");
    }
  };

  const handleAssignOrder = async (deliveryUserId: number) => {
    if (!selectedOrder) {
      Alert.alert("Error", "Please select an order first");
      return;
    }

    try {
      await dispatch(
        assignOrderToDelivery({
          orderId: selectedOrder,
          registerId: deliveryUserId,
        }),
      ).unwrap();

      Alert.alert("Success", "Order assigned successfully");
      setModalVisible(false);
      setOrderModalVisible(false);
      setSelectedOrder(null);
      onAssignSuccess?.();
    } catch (error) {
      Alert.alert("Error", "Failed to assign order");
    }
  };

  const renderOrder = ({ item }: any) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => {
        setSelectedOrder(item.id);
        setOrderModalVisible(false);
        setModalVisible(true);
      }}
    >
      <Text style={styles.orderIdText}>Order #{item.id}</Text>
      <Text style={styles.orderDetails}>
        Customer: {item.name}
        {"\n"}
        Status: {item.status}
        {"\n"}
        Price: ${item.rate}
      </Text>
    </TouchableOpacity>
  );

  const renderDeliveryUser = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => handleAssignOrder(item.id)}
    >
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userDetails}>
        {item.phone} • {item.state}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.assignButton}
        onPress={() => setOrderModalVisible(true)}
      >
        <Text style={styles.assignButtonText}>Assign Orders</Text>
      </TouchableOpacity>

      {/* Order Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={orderModalVisible}
        onRequestClose={() => setOrderModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Order</Text>

            {loading ? (
              <Text style={styles.loadingText}>Loading orders...</Text>
            ) : (
              <FlatList
                data={orders.orders}
                renderItem={renderOrder}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>No orders available</Text>
                }
              />
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOrderModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delivery User Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Select Delivery User for Order #{selectedOrder}
            </Text>

            {loading ? (
              <Text style={styles.loadingText}>Loading users...</Text>
            ) : (
              <FlatList
                data={deliveryUsers}
                renderItem={renderDeliveryUser}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>
                    No delivery users available
                  </Text>
                }
              />
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  assignButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  assignButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  orderItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  orderIdText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  orderDetails: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 14,
    color: "#666666",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#FF3B30",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingText: {
    textAlign: "center",
    padding: 20,
    color: "#666666",
  },
  emptyText: {
    textAlign: "center",
    padding: 20,
    color: "#666666",
  },
});

export default AssignOrderDropdown;
