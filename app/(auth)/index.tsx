import { Button } from "@rneui/themed";
import { Stack } from "@rneui/layout";

import React from "react";
import { SafeAreaView } from "react-native";

const Welcome = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        row
        spacing={10}
        justify="center"
        align="center"
        style={{
          borderWidth: 1,
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Button>Button</Button>
        <Button>Button</Button>
      </Stack>
    </SafeAreaView>
  );
};

export default Welcome;
