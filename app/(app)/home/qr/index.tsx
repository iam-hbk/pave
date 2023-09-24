import { View } from "react-native";
import React from "react";
import { Text } from "@rneui/themed";

const QR = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text h1>Scan the QR code given by the lecturer</Text>
    </View>
  );
};

export default QR;
