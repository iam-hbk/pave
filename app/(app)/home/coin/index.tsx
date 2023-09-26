import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Button, useTheme, Card } from "@rneui/themed";
import { GoldenCoin } from "@/components/icons";
import themeColors from "@/assets/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "@rneui/layout";

const Coins = () => {
  const { theme } = useTheme();
  const days = ["day 1", "day 2", "day 3", "day 4", "day 5"];
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        padding: 20,
      }}
    >
      <LinearGradient
        colors={["lightgrey", "#4E018F"]}
        // start={{ x: 0, y: 0.43 }}
        // end={{ x: 0, y: 0.81 }}
        style={{
          width: "100%",
          height: "40%",
          borderRadius: 10,
        }}
      >
        <Stack
          justify="center"
          align="center"
          style={{
            height: "100%",
          }}
        >
          <Stack
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",

              alignItems: "center",
              padding: 10,
            }}
          >
            {days.map((day, index) => (
              <Stack
                justify="center"
                align="center"
                style={{
                  backgroundColor: "white",
                  height: 85,
                  width: 60,
                  borderRadius: 10,
                }}
              >
                <Text>{day}</Text>
              </Stack>
            ))}
          </Stack>

          <Button>Check In</Button>
        </Stack>
      </LinearGradient>
      <Card>
        <Card.FeaturedTitle>Featured Title</Card.FeaturedTitle>
        <Card.FeaturedSubtitle>Featured Subtitle</Card.FeaturedSubtitle>
      </Card>
    </View>
  );
};

export default Coins;
