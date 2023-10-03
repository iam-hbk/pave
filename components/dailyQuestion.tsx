import { View, StyleSheet, ViewStyle } from "react-native";
import React, { useEffect } from "react";
import DailyQuestionModal from "./dailyQuestionModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "@rneui/themed";
import themeColors from "@/assets/colors";
import { Coin, QuestionOfTheDayImage } from "./icons";
import { DailyQuestion } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getDailyQuestion } from "@/utils/redux/features/questions/question";
import { setDailyQuestion } from "@/utils/redux/features/questions/questionSlice";
import { Skeleton } from "@rneui/base";
import { selectUserToken } from "@/utils/redux/features/user/userSlice";

type Props = {
  isModalQuestionVisible: boolean;
  setIsModalQuestionVisible: (value: boolean) => void;
  style?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
};

const DailyQuestionComponent = ({
  isModalQuestionVisible,
  setIsModalQuestionVisible,
  style = {},
  containerStyle = {},
}: Props) => {
  const token = useSelector(selectUserToken) as string;
  const {
    data: dailyQuestion,
    error,
    isLoading,
  } = useQuery(["dailyQuestion", token], () => getDailyQuestion(token));

  if (error) {
    return (
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: themeColors.quaternaryShaded[100],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{(error as Error).message}</Text>
      </View>
    );
  }
  if (isLoading) {
    return (
      <Skeleton
        LinearGradientComponent={LinearGradient}
        skeletonStyle={{
          backgroundColor: themeColors.quaternaryShaded[500],
        }}
        style={{
          height: 200,
          width: "100%",
          borderRadius: 15,
        }}
      ></Skeleton>
    );
  }
  if (!dailyQuestion) {
    return (
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: themeColors.quaternaryShaded[100],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>No question for today 😉, focus on your books !</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        {
          alignItems: "stretch",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          //shadow
          shadowColor: themeColors.quaternaryDark,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 5,
        },
        style,
      ]}
    >
      <DailyQuestionModal
        question={dailyQuestion}
        isVisible={isModalQuestionVisible}
        onClose={() => setIsModalQuestionVisible(false)}
      />
      <TouchableOpacity
        style={containerStyle}
        onPress={() => {
          setIsModalQuestionVisible(true);
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(91, 136, 217, 0.50)", "rgba(204, 218, 243, 0.50)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.background}
        />
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 20,
            height: 35,
            width: "auto",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              // shadow
              shadowColor: themeColors.tertiaryLight,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 10,
              elevation: 5,
            }}
          >
            <Coin color={themeColors.tertiaryLight} increaseBy={-5} />
          </View>
          <Text
            style={{
              color: themeColors.white,
              fontFamily: "UrbanistBold",
              fontSize: 23,
            }}
          >
            {dailyQuestion.reward}
          </Text>
        </View>
        <View
          style={{
            padding: 20,
            gap: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: themeColors.quaternaryShaded[900],
            }}
          >
            Question of the day
          </Text>
          <Text>Where are the computer labs?</Text>
        </View>
        <View style={styles.questionOfTheDay}>
          <QuestionOfTheDayImage />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DailyQuestionComponent;

const styles = StyleSheet.create({
  background: {
    padding: 20,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  questionOfTheDay: {
    alignSelf: "center",
    position: "absolute",
    right: 0,
  },
});
