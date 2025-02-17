import CardItem from "@/components/CardItem";
import { ScrollView, StatusBar } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { getCount } from "@/store/slice/adminslice";
import { useEffect } from "react";
import { icons } from "@/constants";
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
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <StatusBar />
      <CardItem
        title="All Orders"
        orderNo={pharmacyCount?.allOrdersCount}
        subTitle="Total Orders"
        color="green"
        icon={
          <icons.Feather
            className=""
            name="check-square"
            size={30}
            color={"#fff"}
          />
        }
      />
      <CardItem
        title="Delivery Users"
        orderNo={pharmacyCount?.deliveryUserCount}
        subTitle="Delivery Users"
        color="orange"
        icon={
          <icons.FontAwesome
            className=""
            name="users"
            size={30}
            color={"#fff"}
          />
        }
      />
      <CardItem
        title="Orders Delivered"
        orderNo={pharmacyCount?.ordersDelivered}
        subTitle="Orders Delivered"
        color="lightgreen"
        icon={
          <icons.Feather
            className=""
            name="check-square"
            size={30}
            color={"#fff"}
          />
        }
      />
      <CardItem
        title="Out for Delivery"
        orderNo={pharmacyCount?.ordersOutForDelivery}
        subTitle="Orders out for Delivery"
        color="red"
        icon={
          <icons.Foundation
            className=""
            name="graph-bar"
            size={30}
            color={"#fff"}
          />
        }
      />

      <CardItem
        title="Pharmacy Users"
        orderNo={pharmacyCount?.pharmacyUserCount}
        subTitle="Pharmacy Users"
        color="orange"
        icon={
          <icons.FontAwesome
            className=""
            name="users"
            size={30}
            color={"#fff"}
          />
        }
      />
      <CardItem
        title="Ready for Pickup"
        orderNo={pharmacyCount?.ordersReadyForPickup}
        subTitle="Orders Ready for Delivery"
        color="gray"
        icon={
          <icons.Foundation
            className=""
            name="graph-bar"
            size={30}
            color={"#fff"}
          />
        }
      />
      <CardItem
        title="Register Users"
        orderNo={pharmacyCount?.registerUserCount}
        subTitle="Register Users"
        color="green"
        icon={
          <icons.FontAwesome
            className=""
            name="users"
            size={30}
            color={"#fff"}
          />
        }
      />
      {/* <DetailTable /> */}
    </ScrollView>
  );
};

export default Admin;
