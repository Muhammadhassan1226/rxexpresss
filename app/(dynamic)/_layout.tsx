import React from "react";
import Stack from "expo-router/stack";

const Layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="OrderDetails" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default Layout;
