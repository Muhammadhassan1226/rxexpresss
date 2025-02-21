import { View, GestureResponderEvent } from "react-native";
import { Searchbar } from "react-native-paper";
import CustomButton from "./CustomButton";

interface propsType {
  value: string;
  onChangeText: (value: string) => void;
  onPress: (event: GestureResponderEvent) => void;
}

const SearchBar = ({ value, onChangeText, onPress }: propsType) => {
  return (
    <View style={{ position: "relative" }} className="relative">
      <Searchbar
        placeholder="Search"
        value={value}
        onChangeText={onChangeText}
      />
      <CustomButton
        style={{ width: 150, position: "absolute", right: 0, bottom: 5 }}
        className="w-32 absolute right-0 bottom-0.5"
        title="Search"
        textVariant="primary"
        onPress={onPress}
      />
    </View>
  );
};

export default SearchBar;
