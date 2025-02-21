import { InputFieldProps } from "@/types/type";
import {
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TextInput,
  Platform,
  Keyboard,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

const GOOGLE_MAPS_API_KEY = "AIzaSyBKxi3-BSI3Q-DwmE_CML9uTiwunqQqjQo";
const CustomAddressSearch = ({
  label,
  labelStyle,
  icon,
  expoIcon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  keyboardType,
  error,
  onChangeText,
  placeholder,
  ...props
}: InputFieldProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchAddressSuggestions = async (text: string) => {
    if (text.length < 3) return setSuggestions([]);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
        {
          params: {
            input: text,
            key: GOOGLE_MAPS_API_KEY,
            types: "geocode", // Restrict to addresses
            components: "country:us", // Limit to specific country (optional)
          },
        }
      );
      setSuggestions(response.data.predictions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle selection
  const handleSelect = async (placeId: string) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeId,
            key: GOOGLE_MAPS_API_KEY,
          },
        }
      );

      setQuery(response.data.result.formatted_address);
      setSuggestions([]);
      onChangeText(response.data.result.formatted_address || '')

    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`font-JakartaSemiBold text-md ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={` flex justify-start items-center flex-row relative bg-neutral-100 rounded-full  border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            <View className="w-6 h-6 ml-4">{expoIcon}</View>
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}

            {/* Custom Search Input */}
            <TextInput
              {...props}
              placeholder={placeholder}
              keyboardType={keyboardType}
              value={query}
              className={` rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              onChangeText={(text) => {
                setQuery(text);
                fetchAddressSuggestions(text);
              }}
            />

          </View>
          {/* Dropdown Suggestions */}
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item: any) => item.place_id}
              className="bg-white rounded-lg shadow-md mt-2"
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item.place_id)}
                  className="p-3 border-b"
                >
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              )}
            />
          )}
          {error && <Text className="text-red-600 self-end">{error}</Text>}
        </View>
      </Pressable>
    </KeyboardAvoidingView>


  );
};

export default CustomAddressSearch;
