import { View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Button, Text } from "@rneui/themed";
import { useSelector } from "react-redux";
import { selectUser } from "@/utils/redux/features/user/userSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Home = () => {
  const user = useSelector(selectUser);

  //Please use this hook to handle safe area instead of using safe area view
  //or status bar component, refer to the docs for more info.
  //https://reactnavigation.org/docs/handling-safe-area/
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Text h3>Home Screen</Text>
      <Text h3>Name:{user?.name}</Text>
      <Text h3>Email:{user?.email}</Text>
      {/* <Text h2>{JSON.stringify(user)}</Text> */}
    </View>
  );
};

export default Home;
