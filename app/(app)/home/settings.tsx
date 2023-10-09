import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Button, Text, useTheme } from "@rneui/themed";
import { Stack } from "@rneui/layout";
import { selectUser, unSetUser } from "@/utils/redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

const Settings = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    dispatch(unSetUser());
    queryClient.invalidateQueries();
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
        <Button onPress={() => handleLogout()}>Logout</Button>
      </Stack>
    </SafeAreaView>
  );
};

export default Settings;
