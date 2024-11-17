import CardItem from "@/components/CardItem";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import DetailTable from "./DetailTable";
import { Text } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { getOrderCount } from "@/store/slice/orderslice";
import { useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
const Home = () => {
  const pharmacyCount = useAppSelector(
    (state: RootState) => state.order.pharmacyCount,
  );
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.order.loading);
  console.log("Loading", loading);
  const handlePharmacyCount = async () => {
    try {
      const res = await dispatch(getOrderCount());
      if (res && res.type === "user/login/fulfilled") {
        console.log("SuccessFull PharmacyCount");
      } else {
        console.log("Fail Get PharmacyCount");
      }
    } catch (error: any) {
      console.log("Fail Get PharmacyCount");
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
      <Text>Hi {pharmacyCount?.pharmacy}</Text>
      <CardItem
        title="Order Created"
        orderNo={pharmacyCount?.totalOrders}
        subTitle="Orders Created"
      />
      <CardItem
        title="Ready For Pickup"
        orderNo={pharmacyCount?.readyForPickupOrders}
        subTitle="Waiting"
      />
      <CardItem
        title="Pending"
        orderNo={pharmacyCount?.pendingOrders}
        subTitle="Pending"
      />
      {/* <DetailTable /> */}
    </SafeAreaView>
  );
};

export default Home;
