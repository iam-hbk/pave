//react native basic components
import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Button, useTheme } from "@rneui/themed";
import { GoldenCoin } from "@/components/icons";
import themeColors from "@/assets/colors";
import { selectUser } from "@/utils/redux/features/user/userSlice";
import { useSelector } from "react-redux";

// import { useTheme } from "@rneui/themed";
const CoinIconAndAmount = () => {
  const { theme } = useTheme();
  const user = useSelector(selectUser);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",

        shadowColor: "#dadada",
        shadowOffset: { width: -1, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <GoldenCoin increaseBy={-10} />
      <View
        style={{
          backgroundColor: "#FFEDB0",
          paddingVertical: 5,
          paddingHorizontal: 10,
          zIndex: -1,
          borderRadius: 10,
          marginLeft: -30,
          paddingLeft: 35,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.grey3,
          }}
        >
          {user?.wallet}
        </Text>
      </View>
    </View>
  );
};

export default CoinIconAndAmount;
