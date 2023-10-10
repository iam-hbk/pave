import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Button, Text, useTheme } from "@rneui/themed";
import { Stack } from "@rneui/layout";
import {
  selectUser,
  selectUserId,
  selectUserToken,
  unSetUser,
} from "@/utils/redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeUserTokenFromLocalStorage } from "@/utils/helpers";
import { router } from "expo-router";

const Settings = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectUserToken);
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: removeUserTokenFromLocalStorage,
    onSuccess: () => {
      console.log("LOGOUT", token, userId);
      dispatch(unSetUser());
      queryClient.invalidateQueries({ queryKey: ["getUser", userId, token] });
      router.replace({
        pathname: "/",
        params: { logout: "" },
      });
      console.log("LOGOUT SUCCESS");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
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
