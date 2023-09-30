import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Button, useTheme, Card } from "@rneui/themed";
import {
  CheckedInIcon,
  CheckedInIconToday,
  GoldenCoin,
  Logo,
} from "@/components/icons";
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
        padding: 20,
      }}
    >
      <Stack
        align="center"
        justify="space-around"
        style={{
          flexDirection: "row",
        }}
      >
        {/* <Logo />
        <Text
          style={{
            fontFamily: "UrbanistExtraBold",
            fontSize: 42,
            // paddingVertical: 10,
          }}
        >
          {"  "}POINTS */}
        {/* </Text> */}
      </Stack>
      <LinearGradient
        colors={["#5B88D9", "#4F0A94"]}
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
              marginHorizontal: -160,
              // display:'none',
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                paddingVertical: 3,
              }}
            >
              3 Day streak
            </Text>
            <Text style={{ color: "white" }}>
              Visit everyday & earn up to 50 coins
            </Text>
          </Stack>
          <Stack
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",

              alignItems: "center",
              padding: 10,
            }}
          >
            {days.map((day, index) => {
              if (index !== 3) {
                return (
                  <Stack key={index} justify="center" align="center">
                    <Stack
                      justify="center"
                      align="center"
                      style={{
                        backgroundColor: "#96ace3",
                        height: 85,
                        width: 60,
                        borderRadius: 7,
                      }}
                    >
                      <Stack
                        justify="space-evenly"
                        align="center"
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <CheckedInIcon />
                        <Text style={{ color: "white" }}>+5</Text>
                      </Stack>
                    </Stack>
                    <Text style={{ color: "white", paddingTop: 5 }}>{day}</Text>
                  </Stack>
                );
              } else {
                return (
                  <Stack key={index} justify="center" align="center">
                    <Stack
                      justify="center"
                      align="center"
                      style={{
                        backgroundColor: themeColors.tertiaryShaded[600],
                        height: 85,
                        width: 60,
                        borderRadius: 7,
                      }}
                    >
                      <Stack
                        justify="space-evenly"
                        align="center"
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <CheckedInIconToday />
                        <Text style={{ color: "white" }}>+5</Text>
                      </Stack>
                    </Stack>
                    <Text style={{ color: "white", paddingTop: 5 }}>{day}</Text>
                  </Stack>
                );
              }
            })}
          </Stack>
          <Stack>
            <Button
              buttonStyle={{
                backgroundColor: themeColors.tertiaryShaded[600],
              }}
            >
              Check in{" "}
            </Button>
          </Stack>
        </Stack>
      </LinearGradient>
    </View>
  );
};

export default Coins;
