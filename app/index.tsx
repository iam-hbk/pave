import { View, ActivityIndicator } from "react-native";
import React from "react";

const PrepareApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default PrepareApp;
