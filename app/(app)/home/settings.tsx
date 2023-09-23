import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Text, useTheme } from "@rneui/themed";
import { Stack } from "@rneui/layout";
import { selectUser, unSetUser } from "@/utils/redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";

const Settings = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [scanned, setScanned] = React.useState<boolean>(false);
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
        <Button onPress={() => handleLogout()}>Logout</Button>
      </Stack>
    </SafeAreaView>
  );
};

export default Settings;
