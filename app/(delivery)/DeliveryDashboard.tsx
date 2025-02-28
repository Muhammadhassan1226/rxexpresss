import CardItem from "@/components/CardItem";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useIsFocused } from "@react-navigation/native";
import { getTotalAssignedOrdersCount } from "@/store/slice/deliveryslice";
const Delivery = () => {
  const deliveryCount = useAppSelector(
    (state: RootState) => state.delivery.DashboardCount
  );

  const isFocused = useIsFocused(); // Detect if the page is in focus
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.delivery.loading);
  const handledeliveryCount = async () => {
    try {
      const res = await dispatch(getTotalAssignedOrdersCount());
      if (
        res &&
        res.type === "api/Delivery/GetTotalAssignedOrdersCount/fulfilled"
      ) {
        console.log("SuccessFull GetTotalAssignedOrdersCount");
      } else {
        console.log("Fail Get DashboardCounts");
      }
    } catch (error: any) {
      console.log(error, "Fail Get DashboardCounts");
    }
  };
  useEffect(() => {
    handledeliveryCount();
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
        title="Total Orders"
        orderNo={deliveryCount?.totalOrders}
        subTitle="Total Orders"
      />
      {/* <DetailTable /> */}
    </SafeAreaView>
  );
};

export default Delivery;
