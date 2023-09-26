import { View, Animated } from "react-native";
import { OPENAI_API_KEY } from "@env";
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
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import axios from "axios";
import CoinIconAndAmount from "./CoinIconAndAmount";
const HomeHeader = ({
  navigation,
  route,
  options,
  layout,
  children,
}: DrawerHeaderProps & { children?: React.ReactNode }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const [theQuote, setTheQuote] = React.useState<string>("Loading..."); // [1
  let quote: string;
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const icons = [
    { component: <SchoolHat />, route: "/(app)/home/school" },
    { component: <QuizIcon />, route: "/(app)/home/quiz" },
    { component: <QRIcon increaseBy={-6} />, route: "/(app)/home/qr" },
    { component: <Coin />, route: "/(app)/home/coin" },
  ];

  async function generateShortCode(): Promise<string> {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Generate only one,short,funny quote to motivate student,  be creative, not more than 50 characters.",
            },
          ],
          // max_tokens: 2000,
          // n: 1,
          // stop: null,
          // temperature: 0.5,
          // top_p: 1.0,
          // frequency_penalty: 0.0,
          // presence_penalty: 0.0,,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      // Check if the response has the 'choices' property and at least one choice
      if (
        response &&
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0
      ) {
        console.log(response.data.choices[0].message.content);
        return response.data.choices[0].message.content;
      } else {
        console.error(
          "Error: Unexpected response format from OpenAI API. Status:",
          response.status,
          "Data:",
          response.data
        );
        return "";
      }
    } catch (error) {
      console.error("Error during summary and action steps generation:", error);
      return "";
    }
  }

  useEffect(() => {
    generateShortCode().then((data) => {
      quote = data;
      // remove the double quote from the string
      quote = quote.replace('"', "");
      setTheQuote(quote);
    });
  }, []);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100], // adjust based on your needs
    outputRange: [300, 60], // adjust based on your needs
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      // intensity={100}
      style={{
        height: headerHeight,
        paddingTop: insets.top,
        paddingBottom: 20,
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
            style={{
              color: theme.colors.grey3,
            }}
          >
            {/* {quote ? quote : "Loading..."}  */}~{theQuote}
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
