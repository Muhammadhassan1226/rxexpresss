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
import FontAwesome from "@expo/vector-icons/FontAwesome";

function CustomDrawerContent(props: any) {
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
          label="Dashboard"
          onPress={() => props.navigation.navigate("Dashboard")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          )}
          label="New Order"
          onPress={() => props.navigation.navigate("neworder")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <FontAwesome name="list-alt" size={size} color={color} />
          )}
          label="Order List"
          onPress={() => props.navigation.navigate("Order")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <FontAwesome name="first-order" size={size} color={color} />
          )}
          label="Manhattan"
          onPress={() => props.navigation.navigate("Manhattan")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <FontAwesome name="first-order" size={size} color={color} />
          )}
          label="Nasau"
          onPress={() => props.navigation.navigate("Nasau")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <FontAwesome name="first-order" size={size} color={color} />
          )}
          label="Queens"
          onPress={() => props.navigation.navigate("Queens")}
        />
        <PaperDrawer.Item
          icon={({ color, size }) => (
            <FontAwesome name="first-order" size={size} color={color} />
          )}
          label="Brooklyn"
          onPress={() => props.navigation.navigate("Brooklyn")}
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
            name="Dashboard"
            options={{
              drawerLabel: "Dashboard",
              title: "Dashboard",
              headerTitle: "Dashboard",
            }}
          />
          <Drawer.Screen
            name="neworder"
            options={{
              drawerLabel: "neworder",
              title: "neworder",
              headerTitle: "neworder",
            }}
          />
          <Drawer.Screen
            name="orderlist"
            options={{
              drawerLabel: "orderlist",
              title: "orderlist",
              headerTitle: "orderlist",
            }}
          />
          <Drawer.Screen
            name="Queens"
            options={{
              drawerLabel: "Queens",
              title: "Queens",
              headerTitle: "Queens",
            }}
          />
          <Drawer.Screen
            name="Nasau"
            options={{
              drawerLabel: "Nasau",
              title: "Nasau",
              headerTitle: "Nasau",
            }}
          />
          <Drawer.Screen
            name="Manhattan"
            options={{
              drawerLabel: "Manhattan",
              title: "Manhattan",
              headerTitle: "Manhattan",
            }}
          />
          <Drawer.Screen
            name="Brooklyn"
            options={{
              drawerLabel: "Brooklyn",
              title: "Brooklyn",
              headerTitle: "Brooklyn",
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
