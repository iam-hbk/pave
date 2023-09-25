import { Stack } from "expo-router";
import React from "react";

const QR = () => {
  return <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="[classID]" options={{ headerShown: false }} />
  </Stack>;
};

export default QR;
