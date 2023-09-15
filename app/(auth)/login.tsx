import { SafeAreaView } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Button, Text } from "@rneui/themed";

const Login = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text h2>Please login</Text>
      <Button title={"Login"} onPress={() => router.replace("/(app)/home")} />
    </SafeAreaView>
  );
};

export default Login;
