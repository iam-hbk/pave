import { SafeAreaView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Button } from "@rneui/themed";
import { Stack } from "@rneui/layout";

const Profile = () => {
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <Stack
        justify="center"
        align="center"
        style={{
          flex: 1,
        }}
      >
        <Link href={"/(auth)/welcome"} asChild>
          <Button>Logout</Button>
        </Link>
      </Stack>
    </SafeAreaView>
  );
};

export default Profile;
