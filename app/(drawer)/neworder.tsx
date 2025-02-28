import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "@/components/CustomInput";
import { icons } from "@/constants";
import { Formik } from "formik";
import { OrderinitialValues, OrderSchema } from "@/schemas/order";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "@/components/CustomButton";
import CustomAddressSearch from "@/components/CustomAddressSearch";
import DatePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createOrder, getDeliverySubtype } from "@/store/slice/orderslice";
import { RootState } from "@/store";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
// import { CreateOrderPushNotification } from "@/config";

const Profile = () => {
  const [dateModal, setDateModal] = useState(false);
  const toggleDateModal = () => setDateModal(!dateModal);
  const { deliverySubtypes = [] } = useAppSelector(
    (state: RootState) => state.order
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDeliverySubtype({}));
  }, []);

  const orderSubmit = async (data: any, { resetForm }: any) => {
    let subType: any;
    if (data.deliverySubtypeId) {
      subType = deliverySubtypes.find(
        (item) => item.name === data.deliverySubtypeId
      );
    } else {
      subType = deliverySubtypes[0];
    }

    const body = {
      ...data,
      status: data.paymentStatus === "COD" ? "Cash On Delivery" : "",
      deliverySubtypeId: subType?.id,
      amount: subType?.rate,
    };
    try {
      const res = await dispatch(createOrder(body));
      console.log("response", res);
      if (res && res.type === "/api/Order/create/fulfilled") {
        if (data.paymentStatus === "COD") {
          resetForm();
        } else {
          openPaymentSheet(res.payload.clientSecret, resetForm);
        }
        console.log("SuccessFull Get My Order");
      } else {
        console.log("Fail Get My order");
      }
    } catch (error: any) {
      console.log("Fail Get Get My order");
    }
  };

  const openPaymentSheet = async (clientSecret: any, resetForm: () => void) => {
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "rxexpress",
    });

    if (!error) {
      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) {
        Alert.alert("Payment Failed", paymentError.message);
      } else {
        resetForm();
        Alert.alert("Payment Successful", "Thank you for your payment!");
      }
    } else {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar />
      <Formik
        initialValues={OrderinitialValues}
        validationSchema={OrderSchema}
        onSubmit={orderSubmit}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          isSubmitting,
          errors,
        }) => (
          <View className="p-3 px-6 relative">
            <CustomInput
              label="Recipient Name"
              placeholder="Your Recipient Name Here"
              expoIcon={<icons.AntDesign name="user" size={24} color="black" />}
              value={values.recipientName}
              labelStyle="mb-2"
              onChangeText={handleChange("recipientName")}
              error={errors.recipientName}
            />
            <CustomInput
              label="Phone Number"
              placeholder="Your Phone Number Here"
              expoIcon={<icons.Feather name="phone" size={22} color="black" />}
              value={values.phone}
              labelStyle="mb-2"
              onChangeText={handleChange("phone")}
              error={errors.phone}
            />
            <CustomAddressSearch
              label="Address"
              placeholder="1234 Main st"
              expoIcon={
                <icons.FontAwesome
                  name="address-book-o"
                  size={22}
                  color="black"
                />
              }
              value={values.address}
              labelStyle="mb-2"
              onChangeText={(text: any) => setFieldValue("address", text)}
              error={errors.address}
            />
            <CustomInput
              label="Delivery"
              placeholder="Online Signature"
              expoIcon={
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={22}
                  color="black"
                />
              }
              value={values.deliveryMethods}
              labelStyle="mb-2"
              onChangeText={handleChange("deliveryMethods")}
              error={errors.deliveryMethods}
            />
            <CustomInput
              label="Date To Deliver"
              placeholder="dd---yyy"
              expoIcon={
                <Pressable onPress={toggleDateModal}>
                  <Fontisto name="date" size={20} color="black" />
                </Pressable>
              }
              value={values.dateToDeliver}
              labelStyle="mb-2"
              editable={false}
              onPress={() => toggleDateModal()}
              // onChangeText={handleChange("dateToDeliver")}
              error={errors.dateToDeliver}
            />
            <Text className="font-bold ">Special Instructions</Text>

            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={40}
              onChangeText={handleChange("instructions")}
              value={values.instructions}
              className="p-4 my-4 bg-neutral-100 rounded text"
              style={{ textAlignVertical: "top" }}
            />
            <Text className="font-bold ">Delivery SubTypes</Text>
            <Picker
              selectedValue={`${values.deliverySubtypeId}`}
              onValueChange={handleChange("deliverySubtypeId")}
            >
              {deliverySubtypes.map((item, i) => (
                <Picker.Item
                  key={i}
                  label={`${item.name} Rate: $${item.rate}`}
                  value={item.name}
                />
              ))}
            </Picker>
            <Text className="font-bold ">Choose Your Payment Method</Text>
            <Picker
              selectedValue={values.paymentMethod}
              onValueChange={handleChange("paymentStatus")}
            >
              <Picker.Item
                label="Cash on Delivery (COD) / Cheque"
                value="COD"
              />
              <Picker.Item label="Stripe" value="Stripe" />
            </Picker>

            {/* <Button title="Pay Now" onPress={handlePayment} /> */}
            <CustomButton
              title="Submit"
              className="mt-3 text-lg"
              onPress={() => handleSubmit()}
              textVariant="primary"
              isSubmitting={isSubmitting}
            />

            {dateModal && (
              <DatePicker
                value={
                  values.dateToDeliver
                    ? new Date(values.dateToDeliver)
                    : new Date()
                }
                onChange={(event: any, date?: Date) => {
                  if (
                    (event?.type === "set" || event?.type === "dismissed") &&
                    date
                  ) {
                    const dateFormat = formatDate(date);
                    setFieldValue("dateToDeliver", dateFormat);
                    toggleDateModal();
                  }
                }}
                mode="date"
              />
            )}
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Profile;
