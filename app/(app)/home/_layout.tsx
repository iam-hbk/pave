import React from "react";
import { Drawer } from "expo-router/drawer";
import { View } from "react-native";
import { Text } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GoldenCoin } from "@/components/icons";
import HomeHeader from "@/components/homeHeader";

const Auth = () => {
  const insets = useSafeAreaInsets();

  return (
    <Drawer
      screenOptions={{
        headerBackground: () => (
          <View
            style={{
              backgroundColor: "#ffffff50",
              height: 100,
            }}
          ></View>
        ),
        headerTransparent: true,
      }}
    >
      <Drawer.Screen
        name="main"
        options={{
          title: "Home",
          header: (props) => <HomeHeader {...props} />,
        }}
      />
      
    </Drawer>
  );
};

export default Auth;
