import { SafeAreaView } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Button, Text, Input } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { RootState } from "@/utils/redux/store";
import { setUser } from "@/utils/redux/features/user/userSlice";
import { loginUser } from "@/utils/api/user";
import { User } from "@/types";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");

  // Queries
  // const { data, isLoading, isSuccess, isError, error, refetch } = useQuery({
  //   queryKey: ["user", email],
  //   queryFn: () => loginUser(email),
  // });

  const handleLogin = async () => {
    if (email.trim() === "") {
      // Handle case when email is empty
      console.log("Email is required");
      return;
    }

    const result = await loginUser(email);

    if (result instanceof Error) {
      console.log("Error logging in:", result.message);
    } else {
      dispatch(setUser(result));
      router.replace("/(app)/home");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text h2>Please login</Text>
      <Input
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
      />
      <Button title={"Login"} onPress={() => handleLogin()} />
    </SafeAreaView>
  );
};

export default Login;
