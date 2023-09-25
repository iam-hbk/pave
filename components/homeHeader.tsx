import { View } from "react-native";
import { Input, Text, useTheme } from "@rneui/themed";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Coin,
  GoldenCoin,
  HambergerMenu,
  Logo,
  QRIcon,
  QuizIcon,
  SchoolHat,
} from "./icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import themeColors from "@/assets/colors";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

const HomeHeader = ({
  navigation,
  route,
  options,
  layout,
}: DrawerHeaderProps) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const icons = [
    { component: <SchoolHat />, route: "/(app)/home/school" },
    { component: <QuizIcon />, route: "/(app)/home/quiz" },
    { component: <QRIcon increaseBy={-6} />, route: "/(app)/home/qr" },
    { component: <Coin />, route: "/(app)/home/coin" },
  ];
  return (
    <View
      // intensity={100}
      style={{
        paddingTop: insets.top,
        paddingBottom: 20,
        paddingLeft: insets.left + 18,
        paddingRight: insets.right + 18,
        gap: 10,
        // height: 300,
        // borderWidth: 1,
        backgroundColor: themeColors.white,

        // iOS shadow properties
        shadowColor: "#dadada",
        shadowOffset: { width: -1, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

        // Android shadow properties
        elevation: 5,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // paddingTop: 20,
          paddingHorizontal: 8,
        }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <HambergerMenu />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // iOS shadow properties
            shadowColor: "#dadada",
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 2,

            // Android shadow properties
            elevation: 5,

            // borderWidth: 1,
            // borderColor: themeColors.grey0,
            // paddingVertical: 5,
            // paddingHorizontal: 10,
            // gap: 20,
            // borderRadius: 10,
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
              3500
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          //   borderWidth: 1,
          borderColor: "blue",
          gap: 10,
        }}
      >
        <Logo increaseBy={25} />
        <Text
          h4
          style={{
            color: theme.colors.grey3,
          }}
        >
          ~My GPA is like my coffee, it's high until I get to class.
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 12,
          gap: 10,
        }}
      >
        {icons.map((icon, index) => (
          <TouchableOpacity
            style={{
              backgroundColor: themeColors.quaternaryShaded[200],
              padding: 15,
              borderRadius: 100,
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
            key={index}
            onPress={() => router.push(icon.route as never)}
          >
            {icon.component}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeHeader;
