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
    // <Stack
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    // ></Stack>
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
        name="index"
        options={{
          title: "Home",
          headerTitle: () => null,
          // drawerIcon(props) {
          //   console.log("DR:", props);
          //   return <Text {...props}>Hello</Text>;
          // },

          headerRight: () => (
            <View
              style={{
                backgroundColor: "#ffffff50",
                height: 100,
                borderWidth: 1,
                flexDirection: "row",
                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  marginHorizontal: 20,
                }}
              >
              </View>
              <Text h3>10</Text>
            </View>
          ),
          header:(props)=><HomeHeader {...props} />
        }}
      />
    </Drawer>
  );
};

export default Auth;
