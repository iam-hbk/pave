import { TouchableOpacity, View } from "react-native";
import React from "react";
import { ListItem, Text, Button, Avatar } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import themeColors from "@/assets/colors";
import ClassQuizModal from "./classQuizzesModal";
import { QuizData } from "@/types";

type Props = {};

const quizzes: QuizData[] = [
  {
    _id: "651aa114c4626d73f4a19b62",
    module: "IFS3A",
    questions: [
      {
        questionText: "What is the capital of France?",
        options: ["Rome", "Madrid", "Paris", "Berlin"],
        correctAnswer: 2,
        _id: "651aa114c4626d73f4a19b63",
      },
      {
        questionText: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        _id: "651aa114c4626d73f4a19b64",
      },
      {
        questionText: "What is the largest ocean on Earth?",
        options: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean",
        ],
        correctAnswer: 3,
        _id: "651aa114c4626d73f4a19b65",
      },
    ],
    title: "database security",
    isActive: true,
    expiresAt: "2023-10-02T12:51:04.177Z",
    date: "2023-10-02T10:53:08.652Z",
  },
  {
    _id: "651aa155c4626d73f4a19b6b",
    module: "IFS3A",
    questions: [
      {
        questionText: "What is the capital of France?",
        options: ["Rome", "Madrid", "Paris", "Berlin"],
        correctAnswer: 2,
        _id: "651aa155c4626d73f4a19b6c",
      },
      {
        questionText: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        _id: "651aa155c4626d73f4a19b6d",
      },
      {
        questionText: "What is the largest ocean on Earth?",
        options: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean",
        ],
        correctAnswer: 3,
        _id: "651aa155c4626d73f4a19b6e",
      },
    ],
    title: "General Knowledge Quiz",
    isActive: true,
    expiresAt: "2023-10-02T12:51:04.177Z",
    date: "2023-10-02T10:54:13.975Z",
  },
];

const ClassQuizes = (props: Props) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  //get quizzes of this module from server using the module id

  return (
    <View style={{ width: "100%" }}>
      <ClassQuizModal
        quizzes={quizzes}
        modalVisible={expanded}
        setModalVisible={setExpanded}
      />
      <ListItem.Accordion
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
              title="IFS3A"
              titleStyle={{
                color: "#222",
                fontSize: 20,
                fontFamily: "UrbanistBlack",
              }}
              containerStyle={{
                backgroundColor: "white",
                width: 60,
                margin: 5,
                height: 60,
                borderRadius: 10,
              }}
            />
            <ListItem.Title
              style={{
                color: "white",
                fontSize: 24,
                fontFamily: "UrbanistSemiBold",
              }}
            >
              Information Sytems 3A
            </ListItem.Title>
          </ListItem.Content>
        }
        linearGradientProps={{
          //   colors: ["#FF9800", "#F44336"],
          colors: [
            themeColors.quaternaryShaded[300],
            themeColors.quaternaryDark,
          ],
          start: { x: 1, y: 0 },
          end: { x: 0.2, y: 0 },
        }}
        animation={{
          type: "spring",
        }}
        ViewComponent={LinearGradient}
        onPress={() => {
          setExpanded(!expanded);
        }}
      />
    </View>
  );
};

export default ClassQuizes;
