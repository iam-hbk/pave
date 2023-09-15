import React from "react";
import { Tabs } from "expo-router";
import { Icon } from "@rneui/themed";
import {
  HomeFilled,
  HomeOutlined,
  UserFilled,
  UserOutlined,
} from "@/components/icons";

const App = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
