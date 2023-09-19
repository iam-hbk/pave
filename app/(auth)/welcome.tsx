import { Button, Text } from "@rneui/themed";
import { Stack } from "@rneui/layout";

import React from "react";
import { SafeAreaView } from "react-native";
import { Link, router } from "expo-router";

const Welcome = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text h1>Welcome</Text>
      <Stack
        row
        spacing={10}
        justify="center"
        align="center"
        style={{
          borderWidth: 1,
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Button onPress={() => router.replace("/(auth)/login")}>Login</Button>
        <Button onPress={() => router.replace("/(auth)/register")}>
          Register
        </Button>
      </Stack>
    </SafeAreaView>
  );
};

export default Welcome;
