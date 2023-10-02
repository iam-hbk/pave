import { View, Animated } from "react-native";
import { Input, Text, useTheme } from "@rneui/themed";
import React, { Children, useEffect } from "react";
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
import { router } from "expo-router";
import CoinIconAndAmount from "./coinIconAndAmount";
import { generateShortCode } from "@/utils/redux/features/user/user";

const HomeHeader = ({
  navigation,
  // route,
  // options,
  // layout,
  children,
}: DrawerHeaderProps & { children?: React.ReactNode }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const [theQuote, setTheQuote] = React.useState<string>("Loading..."); // [1
  let quote: string;
  const insets = useSafeAreaInsets();

  const icons = [
    { component: <SchoolHat />, route: "/(app)/home/school" },
    { component: <QuizIcon />, route: "/(app)/home/quiz" },
    { component: <QRIcon increaseBy={-6} />, route: "/(app)/home/qr" },
    { component: <Coin />, route: "/(app)/home/coin" },
  ];

  useEffect(() => {
    generateShortCode().then((data) => {
      quote = data;
      // remove the double quote from the string
      quote = quote.replace('"', "");
      quote = quote.replace('"', "");
      quote = quote.replace('"', "");
      setTheQuote(quote);
    });
  }, []);

  return (
    <Animated.View
      // intensity={100}
      style={{
        height: "auto",
        maxHeight: 315,
        paddingTop: insets.top,
        paddingBottom: 12,
        paddingLeft: insets.left + 18,
        paddingRight: insets.right + 18,
        gap: 10,
        backgroundColor: themeColors.white,
        shadowColor: "#dadada",
        shadowOffset: { width: -1, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
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
        <CoinIconAndAmount />
      </View>

      <View
        style={{
          //   borderWidth: 1,
          borderColor: "blue",
          gap: 10,
        }}
      >
        <Logo increaseBy={25} />
        {theQuote && (
          <Text
            h4
            h4Style={{
              fontSize: 14,
            }}
          >
            ~{theQuote}
          </Text>
        )}
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

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // Remember to set this to false since height is not supported by native driver
        )}
        scrollEventThrottle={16} // Use this to control the scroll event frequency
      >
        {children}
      </Animated.ScrollView>
    </Animated.View>
  );
};

export default HomeHeader;
