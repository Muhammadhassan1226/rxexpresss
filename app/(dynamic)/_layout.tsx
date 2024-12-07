import Stack from "expo-router/stack";

const Layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="OrderDetails" options={{ headerShown: false }} />
        <Stack.Screen
          name="AssignOrderDetails"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
};

export default Layout;
