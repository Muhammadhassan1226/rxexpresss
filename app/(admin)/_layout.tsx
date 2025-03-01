import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  Provider as PaperProvider,
  MD3LightTheme,
  Drawer as PaperDrawer,
} from "react-native-paper";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAppDispatch } from "@/store/hooks";
import { clearAuth } from "@/store/slice/authslice";
import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
function CustomDrawerContent(props: any) {
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    dispatch(clearAuth());
    // Add your logout logic here
    router.replace("/(auth)/sign-in");
  };

  return (
    <DrawerContentScrollView {...props}>
      <PaperDrawer.Section>
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )}
          label="Admin Dashboard"
          onPress={() => props.navigation.navigate("AdminDashboard")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          )}
          label="Registered Users"
          onPress={() => props.navigation.navigate("AllRegisterUsers")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="order-numeric-descending"
              color={color}
              size={size}
            />
          )}
          label="All Orders"
          onPress={() => props.navigation.navigate("AllOrders")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="origin" color={color} size={size} />
          )}
          label="All Manhattans"
          onPress={() => props.navigation.navigate("AllManhattan")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="origin" color={color} size={size} />
          )}
          label="All Queens"
          onPress={() => props.navigation.navigate("AllQueens")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="origin" color={color} size={size} />
          )}
          label="All Nassu"
          onPress={() => props.navigation.navigate("AllNassu")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="origin" color={color} size={size} />
          )}
          label="All Brooklynns"
          onPress={() => props.navigation.navigate("AllBrooklyns")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="origin" color={color} size={size} />
          )}
          label="All Orders without Delivered"
          onPress={() => props.navigation.navigate("AllOrderswithoutDelivered")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          )}
          label="Deliverey Users"
          onPress={() => props.navigation.navigate("Deliveryusers")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="origin" color={color} size={size} />
          )}
          label="Assigned Orders (Admin)"
          onPress={() => props.navigation.navigate("Assignedorders")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="origin" color={color} size={size} />
          )}
          label="Signature Orders (Admin)"
          onPress={() => props.navigation.navigate("Signaturebyadmin")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="origin" color={color} size={size} />
          )}
          label="Registeration"
          onPress={() => props.navigation.navigate("AssignedOrderss")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={handleSignOut}
        />
      </PaperDrawer.Section>
    </DrawerContentScrollView>
  );
}

// Theme configuration
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#5893d4",
    secondary: "#03dac6",
  },
};

export default function Layout() {
  //@ts-ignore
  const notificationListener = useRef<Notifications.EventSubscription>();
  //@ts-ignore
  const responseListener = useRef<Notifications.EventSubscription>();
  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          initialRouteName="AdminDashboard"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: "#fff",
            drawerStyle: {
              backgroundColor: "#fff",
              width: 280,
            },
          }}
        >
          <Drawer.Screen
            name="AdminDashboard"
            options={{
              drawerLabel: "AdminDashboard",
              title: "AdminDashboard",
              headerTitle: "Admin Dashboard",
            }}
          />
          <Drawer.Screen
            name="AllRegisterUsers"
            options={{
              drawerLabel: "AllRegisterUsers",
              title: "AllRegisterUsers",
              headerTitle: "All Registered Users",
            }}
          />
          <Drawer.Screen
            name="AllOrders"
            options={{
              drawerLabel: "AllOrders",
              title: "AllOrders",
              headerTitle: "All Orders",
            }}
          />
          <Drawer.Screen
            name="AllManhattan"
            options={{
              drawerLabel: "AllManhattan",
              title: "AllManhattan",
              headerTitle: "All Manhattan",
            }}
          />
          <Drawer.Screen
            name="AllNassu"
            options={{
              drawerLabel: "AllNassu",
              title: "All Nassua",
              headerTitle: "All Nassua",
            }}
          />
          <Drawer.Screen
            name="AllQueens"
            options={{
              drawerLabel: "AllQueens",
              title: "All Queens",
              headerTitle: "All Queens",
            }}
          />
          <Drawer.Screen
            name="AllBrooklyns"
            options={{
              drawerLabel: "AllBrooklyns",
              title: "All Brooklyns",
              headerTitle: "All Brooklyns",
            }}
          />
          <Drawer.Screen
            name="AllOrderswithoutDelivered"
            options={{
              drawerLabel: "AllOrderswithoutDelivered",
              title: "All Orders without Delivered",
              headerTitle: "AllOrderswithoutDelivered",
            }}
          />
          <Drawer.Screen
            name="Deliveryusers"
            options={{
              drawerLabel: "Deliveryusers",
              title: "Deliverey User",
              headerTitle: "Deliverey User",
            }}
          />
          <Drawer.Screen
            name="Assignedorders"
            options={{
              drawerLabel: "Assignedorders",
              title: "Assigned Orders",
              headerTitle: "Assigned Orders",
            }}
          />
          <Drawer.Screen
            name="Signaturebyadmin"
            options={{
              drawerLabel: "Signature Orders",
              title: "Signature Orders",
              headerTitle: "Signature Orders",
            }}
          />
          <Drawer.Screen
            name="AssignedOrderss"
            options={{
              drawerLabel: "AssignedOrderss",
              title: "AssignedOrderss",
              headerTitle: "Assigned Orders(Non-Admin)",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
  },
  userInfo: {
    marginTop: 12,
  },
});
