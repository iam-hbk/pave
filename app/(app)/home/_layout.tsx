import React from "react";
import { Drawer } from "expo-router/drawer";
import HomeHeader from "@/components/homeHeader";
import QRHeader from "@/components/qrHeader";
import CoinHeader from "@/components/coinHeader";

const Auth = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="main"
        options={{
          title: "Home",
          header: (props) => <HomeHeader {...props} />,
        }}
      />
      <Drawer.Screen
        name="qr"
        options={{
          title: "Attendance Register",
          header: (props) => <QRHeader {...props} />,
        }}
      />
      <Drawer.Screen
        name="coin"
        options={{
          title: "Coins",
          header: (props) => <CoinHeader {...props} />,
        }}
      />
      <Drawer.Screen
        name="quiz"
        options={{
          headerShown: false,
          title: "Quiz",

        }}
      />
        <Drawer.Screen
        name="school"
        options={{
          headerShown: false,
          title: "School",
        }}
      />
    </Drawer>
  );
};

export default Auth;
