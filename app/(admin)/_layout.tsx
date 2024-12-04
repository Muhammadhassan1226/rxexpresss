import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  Provider as PaperProvider,
  MD3LightTheme,
  Drawer as PaperDrawer,
} from "react-native-paper";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { useAppDispatch } from "@/store/hooks";
import { clearAuth } from "@/store/slice/authslice";
function CustomDrawerContent(props: any) {
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    dispatch(clearAuth());
    // Add your logout logic here
    router.replace("/(auth)/sign-in");
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* <View style={styles.drawerHeader}>
        <Avatar.Image
          size={64}
          source={require("../assets/neworder-placeholder.png")}
        />
        <View style={styles.userInfo}>
          <Text variant="titleMedium">John Doe</Text>
          <Text variant="bodySmall">john@example.com</Text>
        </View>
      </View> */}

      <PaperDrawer.Section>
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )}
          label="AdminDashboard"
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
          onPress={() => props.navigation.navigate("AllBrooklynns")}
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
    primary: "#0286FF",
    secondary: "#03dac6",
  },
};

export default function Layout() {
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
              headerTitle: "AdminDashboard",
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
              headerTitle: "AllOrders",
            }}
          />
          <Drawer.Screen
            name="AllManhattan"
            options={{
              drawerLabel: "AllManhattan",
              title: "AllManhattan",
              headerTitle: "AllManhattan",
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
