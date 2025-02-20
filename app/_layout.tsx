import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import NetInfo from "@react-native-community/netinfo";
import { View, Text } from "react-native";
import React from "react";
import "../global.css";
import { StripeProvider } from "@stripe/stripe-react-native";
import CustomSplashScreen from "@/components/CustomSplashScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isConnected, setIsConnected] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    // Handle font loading
    if (loaded) {
      SplashScreen.hideAsync();
    }

    // Set up NetInfo subscription
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected ?? false);
    });

    // Initial network check
    checkConnection();

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [loaded]);

  const checkConnection = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected ?? false);
  };

  // Optional: Network status banner component
  const NetworkBanner = () => {
    if (isConnected) return null;

    return (
      <View
        style={{
          backgroundColor: "#ff4444",
          padding: 10,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Jakarta-Medium",
          }}
        >
          No Internet Connection
        </Text>
      </View>
    );
  };

  if (!loaded) {
    return null;
  }

  return (
    <>
      {showSplash ?
        <CustomSplashScreen onFinish={() => setShowSplash(false)} />
        :
        <StripeProvider publishableKey="pk_live_51QoJ5JHmc4XSvVjLEoP3YmsJzXLcXv4qtZA4Iq7bUiBuHJrIv8L9u4t0jtnMdjxTd8ilr8QueSDVfOC9TgueIZsC008HZa0xTS">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <NetworkBanner />

              <Stack>
                <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                <Stack.Screen name="(delivery)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(dynamic)" options={{ headerShown: false }} />
                <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </PersistGate>
          </Provider>
        </StripeProvider>
      }
    </>
  );
}
