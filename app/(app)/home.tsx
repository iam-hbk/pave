import { SafeAreaView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Button, Text } from "@rneui/themed";
import { Stack } from "@rneui/layout";
import { RootState } from "@/utils/redux/store";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state: RootState) => state.user.value);
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
        <Text h1>{user}</Text>
      </Stack>
    </SafeAreaView>
  );
};

export default Home;
