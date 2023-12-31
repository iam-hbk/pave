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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getQuizzesByModuleId } from "@/utils/redux/features/questions/question";

// const responseData: any = await api.url("/users/login").post({
// const responseData: any = await api.url("/users/login").post({

const Coins = () => {
  const scale = useSharedValue(1);

  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);

  const user = useSelector(selectUser);
  const queryClient = useQueryClient();
  let consecutiveLogins = user?.consecutiveLogins;

  const token = useSelector(selectUserToken);
  const userId = useSelector(selectUserId);
  console.log(token);

  console.log(user);
  const checkinMutation = useMutation(
    async () => {
      const response = await api
        .url("/users/checkin")
        .headers({
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        })
        .post({ id: userId });
      return response;
    },
    {
      onSuccess: () => {
        setAlreadyCheckedIn(true);
        // Invalidate and refetch something when the mutation is successful
        queryClient.invalidateQueries({ queryKey: ["getUser", userId, token] });
      },
      onError: (error) => {
        setAlreadyCheckedIn(true);
        console.error("Error during the request:", error);
      },
    }
  );

  const handleCheckin = () => {
    scale.value = withSpring(0.9, { stiffness: 200, damping: 10 }, () => {
      scale.value = withSpring(1); // Reset to original scale after animation
    });
    checkinMutation.mutate();
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
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
              if (index + 1 !== consecutiveLogins) {
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
            {/* {!alreadyCheckedIn && (
              <Button
                onPress={handleCheckin}
                buttonStyle={{
                  backgroundColor: themeColors.tertiaryShaded[600],
                }}
              >
                Check in{" "}
              </Button>
            )}
            {alreadyCheckedIn && <Button>See you Tomorrow!</Button>} */}
            <Animated.View style={animatedStyle}>
              <Button
                disabled={alreadyCheckedIn}
                onPress={handleCheckin}
                buttonStyle={{
                  backgroundColor: themeColors.tertiaryShaded[600],
                }}
                title={alreadyCheckedIn ? "See you Tomorrow!" : "Check in"}
              />
            </Animated.View>
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
