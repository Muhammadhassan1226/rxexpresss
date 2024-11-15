import CardItem from "@/components/CardItem";
import { FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import DetailTable from "./DetailTable";
import { useAppSelector } from "@/store/hooks";
import { Text } from "react-native";
const Home = () => {
  const user = useAppSelector((state: any) => state.auth.user);
  return (
    <SafeAreaView className="flex-1 px-6">
      <StatusBar />
      <Text>Hi {user?.userName}</Text>
      <CardItem title="Order Created" orderNo={12} subTitle="Orders Created" />
      <CardItem title="Ready For Pickup" orderNo={9} subTitle="Waiting" />
      <CardItem title="Pending" orderNo={0} subTitle="Pending" />
      {/* <DetailTable /> */}
    </SafeAreaView>
  );
};

export default Home;
