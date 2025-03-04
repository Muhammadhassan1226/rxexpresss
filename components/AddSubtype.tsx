import { GestureResponderEvent, View } from "react-native";
import CustomButton from "./CustomButton";
import { TextInput } from "react-native-paper";
import CustomInput from "./CustomInput";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

interface propsType {
  subType: string;
  setSubType: (value: string) => void;
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
  placeholder?: string;
  rate: string;
  setRate: (value: string) => void;
}
const AddSubtype = ({
  subType,
  placeholder,
  setSubType,
  title,
  onPress,
  rate,
  setRate,
}: propsType) => {
  return (
    <View>
      <CustomInput
        label="Delivery Subtype"
        value={subType}
        expoIcon={
          <MaterialCommunityIcons
            name="truck-delivery-outline"
            size={22}
            color="black"
          />
        }
        onChangeText={setSubType}
        placeholder={"Dilvery Subtype"}
      />
      <CustomInput
        label="Rate"
        value={rate}
        expoIcon={<FontAwesome name="dollar" size={22} color="black" />}
        onChangeText={setRate}
        placeholder={"Delivery Rate"}
      />
      <CustomButton
        style={{ marginTop: 20 }}
        title={title ? title : "Search"}
        textVariant="primary"
        onPress={onPress}
      />
    </View>
  );
};

export default AddSubtype;
