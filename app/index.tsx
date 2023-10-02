import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { getUserTokenFromLocalStorage } from "@/utils/helpers";

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
