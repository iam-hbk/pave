import { Stack } from "expo-router";
import { View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import themeColors from "@/assets/colors";

const Main = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Main;
