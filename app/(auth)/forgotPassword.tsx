import { SafeAreaView } from "react-native";
import React from "react";
import { Text, Button } from "@rneui/themed";
import { router } from "expo-router";

const Register = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text h1>Forgot Password</Text>
      <Button
        title={"Send Recovery Email"}
        onPress={() => router.replace("/(app)/home")}
      />
      
    </SafeAreaView>
  );
};

export default Register;
