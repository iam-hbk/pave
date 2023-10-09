import { Button, Text } from "@rneui/themed";
import { View, Animated, Dimensions } from "react-native";
import { Stack } from "@rneui/layout";
import React, { useEffect, useRef } from "react";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserTokenFromLocalStorage } from "@/utils/helpers";
import { getUser } from "@/utils/redux/features/user/user";
import { setUser } from "@/utils/redux/features/user/userSlice";
import Toast from "react-native-toast-message";
import LottieView from "lottie-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "@/assets/theme";
import themeColors from "@/assets/colors";

const Welcome = () => {
  const { width, height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const { data: tokenObject, status: status_token } = useQuery(
    ["userToken"],
    getUserTokenFromLocalStorage
  );
  const shouldFetchUser = !!tokenObject;

  const {
    data: user,
    isError,
    isInitialLoading,
  } = useQuery(
    ["getUser", tokenObject?._id, tokenObject?.token],
    async () => {
      if (shouldFetchUser) {
        return await getUser(tokenObject._id, tokenObject.token);
      }
      return null;
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (user) => {
        if (user) {
          dispatch(setUser(user));
          router.replace("/home");
        }
      },
      onError: (error: any) => {
        console.log("Error getting user details", error, error.message);
        Toast.show({
          type: "error",
          position: "top",
          text1: Error.name,
          text2: JSON.parse(error.message).message,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 50,
        });
      },
    }
  );

  useEffect(() => {
    if (!isInitialLoading && (!user || isError)) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [user, isError]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: themeColors.quaternaryShaded[100],
        //insets
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: insets.bottom,
      }}
    >
      <View
        style={{
          position: "absolute",
          width: (1 / 9) * height,
          height: (1 / 9) * height,
          backgroundColor: themeColors.quaternaryDark,
          // borderTopLeftRadius: 50,
          // borderTopRightRadius: 50,
          borderRadius: 100,
          right: 0.25 * width,
          // right: 0.5 * -width,
          top: 0.1 * height,
        }}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: (2/5) * height,
          // backgroundColor: themeColors.quaternaryShaded[200],
          backgroundColor: themeColors.tertiary,
          // bottom: 0.05 * height,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          left: 0.5 * -width,
        }}
      />
      <View
        style={{
          flex: 2,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 0.2 * height,
        }}
      >
        <LottieView
          style={{ height: height / 3, width: width / 2 }}
          source={require("@/assets/animations/initialLoading.json")}
          autoPlay
          loop
        />
      </View>
      <Animated.View
        style={{
          flex: 2,
          opacity: fadeAnim,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          width: "100%",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "stretch",
            width: "100%",
            gap: 10,
            paddingHorizontal: "10%",
          }}
        >
          <Button
            onPress={() => router.push("/(auth)/login")}
            buttonStyle={{
              backgroundColor: themeColors.quaternaryDark,

            }}
            titleStyle={{
              fontSize: 20,
              fontFamily: "UrbanistSemiBold",
            }}
            title={"Login"}
          />
          <Button
            buttonStyle={{
              backgroundColor: "transparent",
              borderWidth: 1,

              borderColor: themeColors.quaternaryShaded[900],
            }}
            title={"Register"}
            titleStyle={{
              fontSize: 20,
              fontFamily: "UrbanistSemiBold",
              color: themeColors.quaternaryShaded[900],
            }}
            onPress={() => router.push("/(auth)/register")}
          />
        </View>
      </Animated.View>
      {isInitialLoading && <Text h4>Fetching some data...</Text>}
    </View>
  );
};

export default Welcome;
