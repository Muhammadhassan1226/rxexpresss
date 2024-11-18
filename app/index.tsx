import { RootState } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { Redirect } from "expo-router";

const Index = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  console.log(user.token);
  return user?.token ? (
    <Redirect href={"/(drawer)/Dashboard"} />
  ) : (
    <Redirect href="/(auth)/sign-in" />
  );
};

export default Index;
