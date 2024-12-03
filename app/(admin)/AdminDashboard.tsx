import CardItem from "@/components/CardItem";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import DetailTable from "./DetailTable";
import { Text } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { getCount } from "@/store/slice/adminslice";
import { useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import React from "react";
const Admin = () => {
  const pharmacyCount = useAppSelector(
    (state: RootState) => state.admin.DashboardCount,
  );
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.admin.loading);
  console.log("Loading", loading);
  const handlePharmacyCount = async () => {
    try {
      const res = await dispatch(getCount());
      if (res && res.type === "admin/pharmacy-order-count/fulfilled") {
        console.log("SuccessFull PharmacyCount");
      } else {
        console.log("Fail Get PharmacyCount");
      }
    } catch (error: any) {
      console.log(error, "Fail Get PharmacyCount");
    }
  };
  useEffect(() => {
    handlePharmacyCount();
  }, []);

  return (
    <SafeAreaView className="flex-1 px-6">
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <StatusBar />
      <CardItem
        title="All Orders"
        orderNo={pharmacyCount?.allOrdersCount}
        subTitle="All Orders"
      />
      <CardItem
        title="Delivery Count"
        orderNo={pharmacyCount?.deliveryUserCount}
        subTitle="Delivery Count"
      />
      <CardItem
        title="Orders Delivered"
        orderNo={pharmacyCount?.ordersDelivered}
        subTitle="Orders Delivered"
      />
      <CardItem
        title="Orders out for Delivery"
        orderNo={pharmacyCount?.ordersOutForDelivery}
        subTitle="Orders out for Delivery"
      />
      <CardItem
        title="Orders Ready for Delivery"
        orderNo={pharmacyCount?.ordersReadyForPickup}
        subTitle="Orders Ready for Delivery"
      />
      <CardItem
        title="Pharmacy User Count"
        orderNo={pharmacyCount?.pharmacyUserCount}
        subTitle="Pharmacy User Count"
      />
      <CardItem
        title="Register User Count"
        orderNo={pharmacyCount?.registerUserCount}
        subTitle="Register User Count"
      />
      {/* <DetailTable /> */}
    </SafeAreaView>
  );
};

export default Admin;
