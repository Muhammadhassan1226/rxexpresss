import { Stack } from "expo-router";

const Layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="OrderDetails" />
      </Stack>
    </>
  );
};

export default Layout;
