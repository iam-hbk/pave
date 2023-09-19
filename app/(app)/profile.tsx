import { SafeAreaView } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, useTheme } from "@rneui/themed";
import { Stack } from "@rneui/layout";

const Profile = () => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Stack
        justify="center"
        align="center"
        style={{
          flex: 1,
        }}
      >
        <Button
          onPress={() => {
            router.replace("/(auth)/welcome");
          }}
        >
          Logout
        </Button>
      </Stack>
    </SafeAreaView>
  );
};

export default Profile;
