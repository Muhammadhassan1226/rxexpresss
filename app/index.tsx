import { RootState } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { Redirect } from "expo-router";

const Index = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  console.log("User API_________________________", user);
  if (user?.role === "Admin") {
    return <Redirect href={"/(admin)/AdminDashboard"} />;
  } else if (user?.role === "Delivery") {
    return <Redirect href={"/(delivery)/DeliveryDashboard"} />;
  } else if (user?.role === "PharmacyUser") {
    return <Redirect href={"/(drawer)/Dashboard"} />;
  } else {
    return <Redirect href="/(auth)/sign-in" />;
  }
};

export default Index;
