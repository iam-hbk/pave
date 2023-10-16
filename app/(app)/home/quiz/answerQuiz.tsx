import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router, useGlobalSearchParams } from "expo-router";
import { StartQuizBlob } from "@/components/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button, Text } from "@rneui/themed";
import themeColors from "@/assets/colors";
import { QuizData, QuizQuestion } from "@/types";
import { formatDate } from "@/utils/helpers";

type Props = {};

const AnswerQuiz = (props: Props) => {
  const params = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const quiz: QuizData = JSON.parse(params.quizData as string);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: insets.bottom + 20,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          marginLeft: 10,
          padding: 15,
          alignSelf: "flex-start",
        }}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <StartQuizBlob />
        <Text
          h1
          h1Style={{
            color: themeColors.quaternaryShaded[800],
            paddingHorizontal: 30,
            textTransform: "capitalize",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {quiz.title}
        </Text>
        <Text
          h3
          h3Style={{
            color: themeColors.grey2,
            paddingHorizontal: 30,
            textTransform: "capitalize",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {formatDate(quiz.expiresAt)}
        </Text>
      </View>
      <Button
        style={{
          alignSelf: "flex-end",
          // marginBottom: 20,
        }}
        buttonStyle={{
          backgroundColor: themeColors.tertiary,
        }}
        titleStyle={{
          fontFamily: "UrbanistBold",
        }}
        title={"Start Quiz"}
        onPress={() => {
          console.log("Clicked")
          router.push({
            pathname: "/AnswerQuiz",
            params: { quizData: JSON.stringify(quiz) },
          });
        }}
      />
    </View>
  );
};

export default AnswerQuiz;
