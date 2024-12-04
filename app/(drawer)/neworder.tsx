import { ScrollView, StatusBar, Text, TextInput, View } from "react-native";
import CustomInput from "@/components/CustomInput";
import { icons } from "@/constants";
import { Formik } from "formik";
import { OrderinitialValues, OrderSchema } from "@/schemas/order";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "@/components/CustomButton";

const Profile = () => {
  const orderSubmit = () => {
    console.log("orderSubmit");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar />
      <Formik
        initialValues={OrderinitialValues}
        validationSchema={OrderSchema}
        onSubmit={orderSubmit}
      >
        {({ handleChange, handleSubmit, values, isSubmitting, errors }) => (
          <View className="p-3 px-6">
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
              expoIcon={<icons.AntDesign name="user" size={24} color="black" />}
              value={values.phone}
              labelStyle="mb-2"
              onChangeText={handleChange("phone")}
              error={errors.phone}
            />
            <CustomInput
              label="Address"
              placeholder="1234 Main st"
              expoIcon={<icons.AntDesign name="user" size={24} color="black" />}
              value={values.address}
              labelStyle="mb-2"
              onChangeText={handleChange("address")}
              error={errors.address}
            />
            <CustomInput
              label="Delivery"
              placeholder="Online Signature"
              expoIcon={<icons.AntDesign name="user" size={24} color="black" />}
              value={values.deliveryMethods}
              labelStyle="mb-2"
              onChangeText={handleChange("deliveryMethods")}
              error={errors.deliveryMethods}
            />
            <CustomInput
              label="Date To Deliver"
              placeholder="dd---yyy"
              expoIcon={<icons.AntDesign name="user" size={24} color="black" />}
              value={values.dateToDeliver}
              labelStyle="mb-2"
              onChangeText={handleChange("dateToDeliver")}
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
              selectedValue={values.deliveryMethods}
              onValueChange={handleChange("deliveryMethods")}
            >
              <Picker.Item label="Fridge Rate: $10.00" value="Fridge" />
              <Picker.Item label="Hazardous Rate: $12.00" value="Hazardous" />
              <Picker.Item label="Freezer Rate: $15.00" value="Freezer" />
            </Picker>
            <Text className="font-bold ">Choose Your Payment Method</Text>
            <Picker
              selectedValue={values.paymentMethod}
              onValueChange={handleChange("paymentMethod")}
            >
              <Picker.Item
                label="Cash on Delivery (COD) / Cheque"
                value="Cash on Delivery (COD) / Cheque"
              />
              <Picker.Item label="Stripe" value="Stripe" />
            </Picker>
            <CustomButton
              title="Submit"
              className="mt-3 text-lg"
              onPress={() => handleSubmit()}
              textVariant="primary"
              isSubmitting={isSubmitting}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Profile;
