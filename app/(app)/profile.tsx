import { SafeAreaView } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Text, useTheme } from "@rneui/themed";
import { Stack } from "@rneui/layout";
import { unSetUser, updateUser } from "@/utils/redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleLogout = () => {
    dispatch(unSetUser());
    router.replace("/(auth)/welcome");
  };

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
        <Text>{user}</Text>
        <Button onPress={() => handleLogout()}>Logout</Button>
        <Button onPress={() => dispatch(updateUser(4))}>Increment</Button>
      </Stack>
    </SafeAreaView>
  );
};

export default Profile;
