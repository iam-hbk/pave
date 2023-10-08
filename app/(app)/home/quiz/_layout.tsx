import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

type Props = {};

const Quiz = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="answerQuiz"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
};

export default Quiz;
