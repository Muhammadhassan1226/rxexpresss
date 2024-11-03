import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="home" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "home",
            title: "Home",
          }}
        />
        <Drawer.Screen
          name="profile" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Profile",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="rides" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Rides",
            title: "overview",
          }}
        />{" "}
        <Drawer.Screen
          name="chats" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Chats",
            title: "overview",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
