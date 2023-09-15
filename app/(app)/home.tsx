import { SafeAreaView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Button, Text } from "@rneui/themed";
import { Stack } from "@rneui/layout";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        justify="center"
        align="center"
        style={{
          flex: 1,
        }}
      >
        <Text h1>Home Screen</Text>
      </Stack>
    </SafeAreaView>
  );
};

export default Home;
