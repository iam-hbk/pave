import React from "react";
import { Drawer } from "expo-router/drawer";
import HomeHeader from "@/components/homeHeader";
import QRHeader from "@/components/qrHeader";

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
    </Drawer>
  );
};

export default Auth;
