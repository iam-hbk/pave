import { SafeAreaView } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Button, Text } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import { login } from "@/utils/redux/features/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  function handleLogin() {
    dispatch(login());
    router.replace("/(app)/home")
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text h2>Please login</Text>
      <Button title={"Login"} onPress={() => handleLogin()} />
    </SafeAreaView>
  );
};

export default Login;
