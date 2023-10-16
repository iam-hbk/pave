import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { router, useGlobalSearchParams } from "expo-router";
import { QuizData } from "@/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { CheckBox, LinearProgress } from "@rneui/base";
import themeColors from "@/assets/colors";
import Toast from "react-native-toast-message";
import { Rafiki } from "@/components/icons";

const { width } = Dimensions.get("window");

type Props = {};
const SubmitQuiz = () => {
  const [progress, setProgress] = React.useState(0);
  const params = useGlobalSearchParams();
  const quiz: QuizData = JSON.parse(params.quizData as string);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState(1);

  const handleQuizCompletion = () => {
    const newCompletedQuizzes = completedQuizzes + 1;
    setCompletedQuizzes(newCompletedQuizzes);
    return newCompletedQuizzes;
  };
  useEffect(() => {
    setProgress(completedQuizzes / quiz.questions.length);
  }
  , [completedQuizzes]);


  const handleNext = () => {
    const length = quiz.questions.length;
    const newCompletedQuizzes = handleQuizCompletion();
    setProgress(newCompletedQuizzes / length);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      console.log("Quiz completed!");
    }
    if (completedQuizzes === quiz.questions.length - 1) {
      router.back;
      Toast.show({
        type: "success",
        text1: "Quiz completed!",
        text2: "You have completed the quiz.",
        visibilityTime: 1000,
        autoHide: true,
        onHide: () => router.back(),
      });
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={router.back}>
          <View
            style={{
              borderRadius: 99,
              backgroundColor: "orange",
            }}
          >
            <Ionicons
              name="close"
              style={{
                color: "white",
              }}
              size={30}
              color="black"
            />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.questionCount}>
        Question {currentQuestionIndex + 1}/{quiz.questions.length}
      </Text>
      {/* <View style={styles.progressBarContainer}> */}
      <LinearProgress
        color="orange"
        trackColor="#a5bde8"
        style={{
          marginVertical: 10,
          height: 10,
          borderRadius: 10,
          width: width * 0.85,
        }}
        value={progress}
        variant="determinate"
      />
      {/* </View> */}
      <View
        style={{
          display: "flex",
          padding: 20,
          alignSelf: "flex-start",
          marginBottom: -50,
          zIndex: 1,
        }}
      >
        <Rafiki />
      </View>
      <View style={styles.card}>
        <Text style={styles.questionText}>
          {quiz.questions[currentQuestionIndex].questionText}
        </Text>
        {quiz.questions[currentQuestionIndex].options.map((option, index) => (
          <CheckBox
            key={index}
            title={option}
            checked={selectedAnswer === index}
            containerStyle={styles.checkbox}
            onPress={() => setSelectedAnswer(index)}
          />
        ))}
        <Button
          title="Next"
          buttonStyle={styles.nextButton}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5b88d9",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  progressBarContainer: {
    width: "80%",
    height: 20,
    // paddingVertical: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "orange",
    borderRadius: 10,
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    paddingTop: 70,
    alignItems: "center",
    elevation: 5, // Android shadow
  },
  questionCount: {
    color: "white",
    fontSize: 18,
    // marginBottom: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  questionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#41619a",
  },
  checkbox: {
    alignSelf: "stretch",
    // backgroundColor: null,
    borderWidth: 0,
    padding: 10,
    marginVertical: 5,
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "orange",
    paddingHorizontal: 50,
  },
});

export default SubmitQuiz;
