import { SafeAreaView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Button, Text } from "@rneui/themed";
import { Stack } from "@rneui/layout";
import { useSelector } from "react-redux";
import { selectUser } from "@/utils/redux/features/user/userSlice";

const Home = () => {
  const user = useSelector(selectUser);
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
        <Text h1>{JSON.stringify(user)}</Text>
        <Text h2>Data</Text>
      </Stack>
    </SafeAreaView>
  );
};

export default Home;
