import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync(); // Prevent Expo's default splash from disappearing too early

const CustomSplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating loading time
      setIsReady(true);
      await SplashScreen.hideAsync(); // Hide Expo's splash
      onFinish(); // Notify the app that splash is done
    };

    loadResources();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Image source={require("../assets/images/splash.png")} style={styles.splashImage} />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  splashImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures full screen
  },
});

export default CustomSplashScreen;
