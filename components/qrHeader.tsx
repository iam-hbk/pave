import { View } from "react-native";
import { Input, Text, useTheme, Button, Icon } from "@rneui/themed";
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
import { Entypo } from "@expo/vector-icons";

const QRHeader = ({
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
    <BlurView
      intensity={100}
      style={{
        paddingTop: insets.top,
        paddingBottom: 5,
        paddingLeft: insets.left + 18,
        paddingRight: insets.right + 18,
        gap: 10,
        flexDirection: "row",
        // backgroundColor: themeColors.white,
      }}
    >
      <Icon
        name={navigation.canGoBack() ? "chevron-left" : "menu"}
        type="entypo"
        size={30}
        style={{
          padding: 5,
        }}
        onPress={() => {
          if (navigation.canGoBack()) navigation.goBack();
          else navigation.openDrawer();
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          paddingHorizontal: 8,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "UrbanistMedium",
          }}
        >
          {options.title}
        </Text>
      </View>
    </BlurView>
  );
};

export default QRHeader;
