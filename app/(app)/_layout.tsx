import React from "react";
import { Tabs, router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import {
  HomeFilled,
  HomeOutlined,
  UserFilled,
  UserOutlined,
} from "@/components/icons";

const App = () => {
  const navigation = useNavigation();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarShowLabel: false, //For now
          tabBarIcon: ({ focused }) => {
            return !focused ? <HomeOutlined /> : <HomeFilled />;
          },
        }}
        listeners={{
          tabPress: (e) => {
            (navigation.navigate as any)("home", { screen: "main" });
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarShowLabel: false, //For now
          tabBarIcon: ({ focused }) => {
            return !focused ? <UserOutlined /> : <UserFilled />;
          },
        }}
      />
    </Tabs>
  );
};

export default App;
