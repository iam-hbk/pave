import React from "react";
import { Drawer } from "expo-router/drawer";
import HomeHeader from "@/components/homeHeader";

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
        }}
      />
    </Drawer>
  );
};

export default Auth;
