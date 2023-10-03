import { View } from "react-native";
import React from "react";
import { Skeleton, Text } from "@rneui/themed";
import themeColors from "@/assets/colors";
import { useStudentRanking } from "@/hooks/useStudentRanking";
import { LinearGradient } from "expo-linear-gradient";

type Props = {};

const RankingCard = (props: Props) => {
  const { data, error } = useStudentRanking();

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
