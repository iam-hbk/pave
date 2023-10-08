import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, ListItem } from "@rneui/themed";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { QuizData } from "@/types";
import themeColors from "@/assets/colors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

type Props = {
  data: QuizData[];
};

const QuizComponent = ({ data }: Props) => {
  return (
    <View
      style={{
        width: "100%",
      }}
    >
      {data &&
        data.length > 0 &&
        data.map((quiz: QuizData) => {
          return (
            <ListItem.Accordion
              key={quiz._id}
              Component={TouchableOpacity}
              containerStyle={{
                borderRadius: 10,
                marginBottom: 10,
              }}
              noIcon
              content={
                <ListItem.Content
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Avatar
                    title={quiz.moduleCode}
                    titleStyle={{
                      color: "#222",
                      fontSize: 20,
                      fontFamily: "UrbanistBlack",
                    }}
                    containerStyle={{
                      backgroundColor: "white",
                      width: 80,
                      margin: 5,
                      height: 60,
                      borderRadius: 10,
                    }}
                  />
                  <View>
                    <ListItem.Title
                      style={{
                        color: "white",
                        fontSize: 22,
                        fontFamily: "UrbanistSemiBold",
                        textTransform: "capitalize",
                      }}
                    >
                      {quiz.title}
                    </ListItem.Title>
                    <ListItem.Subtitle
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontFamily: "UrbanistRegular",
                      }}
                    >
                      {quiz.questions.length} Questions
                    </ListItem.Subtitle>
                  </View>
                </ListItem.Content>
              }
              linearGradientProps={{
                colors: ["#FF9800", "#F44336"],
                // colors: [
                //   themeColors.quaternaryShaded[300],
                //   themeColors.quaternaryDark,
                // ],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 },
              }}
              animation={{
                type: "spring",
              }}
              ViewComponent={LinearGradient}
              onPress={() => {
                router.push({
                  pathname: "/(app)/home/quiz/answerQuiz",
                  params: { quiz: JSON.stringify(quiz) },
                });
              }}
            />
          );
        })}
    </View>
  );
};

export default QuizComponent;
