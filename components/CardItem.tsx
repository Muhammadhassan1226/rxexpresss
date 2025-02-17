import { Text, View } from "react-native";

interface cardType {
  title: string;
  orderNo: string | number;
  color?: string;
  subTitle: string;
  icon: any;
}
const CardItem = ({ title, orderNo, color, subTitle, icon }: cardType) => {
  return (
    <View className="bg-white w-full justify-evenly p-4 my-4 h-40 rounded-md">
      <Text className="text-blue-950 text-lg font-bold">{title}</Text>
      <View className="flex-row ">
        <View
          style={{ backgroundColor: color ? color : "" }}
          className="mr-4 w-14 h-14 rounded-full justify-center items-center bg-blue-300"
        >
          {icon}
        </View>
        <View>
          <Text className="text-blue-950 text-xl font-bold">{orderNo}</Text>
          <Text className="text-green-700 text-lg">{subTitle}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardItem;
