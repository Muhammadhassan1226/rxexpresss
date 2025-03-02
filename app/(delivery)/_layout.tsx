import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  Provider as PaperProvider,
  MD3LightTheme,
  Drawer as PaperDrawer,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Notifications from "expo-notifications";
import { useAppDispatch } from "@/store/hooks";
import { clearAuth } from "@/store/slice/authslice";
import { useEffect, useRef } from "react";
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
          label="AdminDashboard"
          onPress={() => props.navigation.navigate("DeliveryDashboard")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          )}
          label="Assigned Orders"
          onPress={() => props.navigation.navigate("AssignedOrders")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="order-numeric-descending"
              color={color}
              size={size}
            />
          )}
          label="OrdersSignatureList"
          onPress={() => props.navigation.navigate("OrdersSignatureList")}
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
    primary: "#37B9C5",
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
          initialRouteName="DeliveryDashboard"
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
            name="DeliveryDashboard"
            options={{
              drawerLabel: "DeliveryDashboard",
              title: "Delivery Dashboard",
              headerTitle: "Delivery Dashboard",
            }}
          />
          <Drawer.Screen
            name="AssignedOrders"
            options={{
              drawerLabel: "AssignedOrders",
              title: "Assigned Orders",
              headerTitle: "Assigned Orders",
            }}
          />
          <Drawer.Screen
            name="OrdersSignatureList"
            options={{
              drawerLabel: "OrdersSignatureList",
              title: "Orders Signature List",
              headerTitle: "Orders Signature List",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
