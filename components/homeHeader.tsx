import { View } from "react-native";
import { Text, useTheme } from "@rneui/themed";
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

const HomeHeader = ({ navigation, route, options }: DrawerHeaderProps) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const icons = [
    <SchoolHat />,
    <QuizIcon />,
    <QRIcon increaseBy={-6} />,
    <Coin />,
  ];
  //   console.log("HomeHeader:", props);
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + 18,
        paddingRight: insets.right + 18,
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
          }}
        >
          <GoldenCoin height={50} width={50} />
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
            <Text h4>3500</Text>
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
          >
            {icon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeHeader;
