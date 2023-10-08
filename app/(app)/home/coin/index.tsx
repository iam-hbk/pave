import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Button, useTheme, Card } from "@rneui/themed";
import axios from "axios";

import {
  CheckedInIcon,
  CheckedInIconToday,
  GoldenCoin,
  Logo,
} from "@/components/icons";
import themeColors from "@/assets/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "@rneui/layout";
import { Image } from "@rneui/themed";
import { useSelector } from "react-redux";
import {
  selectUser,
  selectUserId,
  selectUserToken,
} from "@/utils/redux/features/user/userSlice";
import CheckIn from "@/utils/redux/features/Checkin/checkIn";
import api from "@/utils/redux/api";

// const responseData: any = await api.url("/users/login").post({
// const responseData: any = await api.url("/users/login").post({

const Coins = () => {
  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);
  const user = useSelector(selectUser);
  let consecutiveLogins = user?.consecutiveLogins;

  const token = useSelector(selectUserToken);
  const userId = useSelector(selectUserId);
  console.log(token);

  console.log(user);
  const handleCheckin = async () => {
    try {
      const response = await api
        .url("/users/checkin")
        .headers({
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        })
        .post({ id: userId });
      setAlreadyCheckedIn(true);
      console.log(response);
    } catch (error) {
      console.error("Error during the request:", error);
    }
  };

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
      ></Stack>
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
              if (index !== consecutiveLogins) {
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
            {!alreadyCheckedIn && (
              <Button
                onPress={handleCheckin}
                buttonStyle={{
                  backgroundColor: themeColors.tertiaryShaded[600],
                }}
              >
                Check in{" "}
              </Button>
            )}
            {alreadyCheckedIn && <Button>See you Tomorrow!</Button>}
          </Stack>
        </Stack>
      </LinearGradient>

      <View
        style={{
          width: "107%",
        }}
      >
        <Card
          containerStyle={{
            borderRadius: 10,
            // shadowColor: "#dadada",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 5,
            borderWidth: 0,
          }}
        >
          <Text h3>Scavenger Hunt</Text>

          <Card.Divider />
          <Card.Image
            style={{ borderRadius: 9 }}
            source={require("@/assets/images/Scavenger_hunt.png")}
          />
          <Text style={{ fontSize: 15, paddingVertical: 5 }}>Mar 29</Text>
          <Text style={{ fontSize: 15, paddingVertical: 5 }}>
            Join our Scavenger hunt at the student center to earn more points
          </Text>
        </Card>
      </View>
    </View>
  );
};

export default Coins;
