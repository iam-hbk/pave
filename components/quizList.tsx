import { View, Text } from "react-native";
import React from "react";
import QuizComponent from "./quizComponent";
import { UseQueryResult, useQueries, useQuery } from "@tanstack/react-query";
import { QuizData, User } from "@/types";
import { selectUser } from "@/utils/redux/features/user/userSlice";
import { useSelector } from "react-redux";
import { getQuizzesByModuleId } from "@/utils/redux/features/questions/question";
import LottieView from "lottie-react-native";

type Props = {};
interface ResultOBject {
  quizzes: QuizData[];
}

const QuizList = (props: Props) => {
  const user = useSelector(selectUser) as User;
  const modulesQuizzes: UseQueryResult[] = useQueries({
    queries: (user?.modules || []).map((module, index) => {
      return {
        queryKey: [`quiz${module}}`, module, user?.token],
        queryFn: () => getQuizzesByModuleId(module, user?.token as string),
      };
    }),
  });

  if (modulesQuizzes.some((result) => result.isLoading || !result.data)) {
    return (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
        }}
      >
        <LottieView
          style={{ width: "100%", height: 150 }}
          source={require("@/assets/animations/search.json")}
          autoPlay
          loop
        />
      </View>
    );
  }
  return (
    <View style={{ width: "100%" }}>
      {modulesQuizzes.map((result, index) => {
        if (result.isError) return <Text key={index}>Error</Text>;
        const data = result.data as ResultOBject;

        if (!result.data || data.quizzes.length < 1) return;
        return <QuizComponent key={index} data={data.quizzes} />;
      })}
    </View>
  );
};

export default QuizList;
