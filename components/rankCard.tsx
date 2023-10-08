import { View } from "react-native";
import React from "react";
import { Skeleton, Text } from "@rneui/themed";
import themeColors from "@/assets/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import { getUser, getUserRanking } from "@/utils/redux/features/user/user";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/utils/redux/features/user/userSlice";
import { User } from "@/types";
import Toast from "react-native-toast-message";
import useSocket from "@/hooks/useSocket";

type Props = {};

const RankingCard = (props: Props) => {
  const user = useSelector(selectUser) as User;
  const { data, error, refetch } = useQuery(["userRanking"], () =>
    getUserRanking(user._id)
  );
  const dispatch = useDispatch();
  const {
    data: userData,
    error: userError,
    refetch: refetchUser,
  } = useQuery(["user"], () => getUser(user._id, user.token));
  if (userError) {
    Toast.show({
      type: "error",
      position: "top",
      text2: (userError as any).message,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
    });
  }

  useSocket("wallet change", async (...args: any[]) => {
    console.log("wallet change", args);
    await refetch();
  });
  if (error) {
    Toast.show({
      type: "error",
      position: "top",
      text2: (error as any).message,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
    });
  }

  if (error) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data ? (
        <Text
          h2
          h2Style={{
            fontSize: 30,
            fontFamily: "UrbanistBlack",
            color: themeColors.tertiaryShaded[900],
            paddingHorizontal: 10,
            textAlign: "center",
          }}
        >
          {data}
        </Text>
      ) : (
        <Skeleton
          LinearGradientComponent={LinearGradient}
          skeletonStyle={{
            backgroundColor: themeColors.tertiaryShaded[500],
          }}
          style={{
            width: 20,
            height: 30,
            margin: 5,
            borderRadius: 4,
            backgroundColor: themeColors.tertiaryShaded[900],
          }}
        ></Skeleton>
      )}
      <Text>Rank</Text>
    </View>
  );
};

export default RankingCard;
