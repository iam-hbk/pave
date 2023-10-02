import { View } from "react-native";
import React from "react";
import { Text } from "@rneui/themed";
import themeColors from "@/assets/colors";
import { useStudentRanking } from "@/hooks/useStudentRanking";

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

  if (!data) {
    return (
      <View>
        <Text>Loading</Text>
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
      <Text>Rank</Text>
    </View>
  );
};

export default RankingCard;
