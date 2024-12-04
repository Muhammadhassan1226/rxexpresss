import CardItem from "@/components/CardItem";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { getCount } from "@/store/slice/adminslice";
import { useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useIsFocused } from "@react-navigation/native";
const Admin = () => {
  const pharmacyCount = useAppSelector(
    (state: RootState) => state.admin.DashboardCount,
  );
  const isFocused = useIsFocused(); // Detect if the page is in focus
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.admin.loading);
  const handlePharmacyCount = async () => {
    try {
      const res = await dispatch(getCount());
      if (res && res.type === "api/SuperAdmin/DashboardCounts/fulfilled") {
        console.log("SuccessFull SuperAdmin DashboardCounts");
      } else {
        console.log("Fail Get DashboardCounts");
      }
    } catch (error: any) {
      console.log(error, "Fail Get DashboardCounts");
    }
  };
  useEffect(() => {
    handlePharmacyCount();
  }, [isFocused]);

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
