import { StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { Button, Card, ListItem, Text } from "@rneui/themed";
import { useSelector } from "react-redux";
import { selectUser } from "@/utils/redux/features/user/userSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native";
import themeColors from "@/assets/colors";
import { QuestionOfTheDayImage } from "@/components/icons";
import { LinearGradient } from "expo-linear-gradient";
import { selectQuestions } from "@/utils/redux/features/questions/questionSlice";
import { LinearProgress } from "@rneui/themed";

interface Task {
  id: number;
  name: string;
  completed: boolean;
  description: string;
}

const TASKS: Task[] = [
  {
    id: 2,
    name: "Check-in",
    completed: false,
    description: "Check in to mark your presence for the day.",
  },
  {
    id: 3,
    name: "Social engagement",
    completed: false,
    description: "Engage with peers and participate in social activities.",
  },
  {
    id: 4,
    name: "Class Attendance",
    completed: true,
    description: "Attend your classes to ensure continuous learning.",
  },
  {
    id: 5,
    name: "Daily quiz",
    completed: false,
    description: "Take the daily quiz to test your knowledge.",
  },
];

const Home = () => {
  const user = useSelector(selectUser);
  const [tasks, setTasks] = React.useState<Task[]>(TASKS);
  const questions = useSelector(selectQuestions);
  const router = useRouter();

  function calculateOverallProgress(tasks: Task[]) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    return completedTasks / totalTasks;
  }

  const [progress, setProgress] = React.useState(
    calculateOverallProgress(tasks)
  );
  //Please use this hook to handle safe area instead of using safe area view
  //or status bar component, refer to the docs for more info.
  //https://reactnavigation.org/docs/handling-safe-area/
  const insets = useSafeAreaInsets();

  // React.useEffect(() => {
  //   let subs = true;
  //   if (progress < 1 && progress !== 0) {
  //     setTimeout(() => {
  //       if (subs) {
  //         setProgress(progress + 0.1);
  //       }
  //     }, 100);
  //   }
  //   return () => {
  //     subs = false;
  //   };
  // }, [progress]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 230,
        paddingHorizontal: 20,
        gap: 20,
        
        // backgroundColor: themeColors.quaternaryShaded[100],
      }}
      scrollEventThrottle={16}
      style={{
        flex: 1,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          /**
           *
           * The questions (if they are many) will be stored in the redux store,
           * The one that will be displayed will be the one with the ID we send in the params
           */
          let id = "2";
          router.push(`/(app)/home/main/${id}`);
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

      <View
        style={{
          borderRadius: 10,
          backgroundColor: themeColors.quaternaryShaded[200],
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "UrbanistSemiBold",
              fontSize: 18,
              color: themeColors.quaternaryShaded[900],
            }}
          >
            Daily Tasks
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: themeColors.quaternaryShaded[900],
            }}
          >
            {(progress * 100).toFixed()}%
          </Text>
        </View>
        <LinearProgress
          color={themeColors.tertiaryShaded[600]}
          trackColor={themeColors.tertiaryShaded[300]}
          style={{ marginVertical: 10, height: 10, borderRadius: 10 }}
          value={progress}
          variant="determinate"
        />
      </View>
      <View
        style={{
          marginVertical: 5,
          backgroundColor: themeColors.tertiaryShaded[400],
          padding: 20,
          borderRadius: 10,
        }}
      >
        {tasks.map((task, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              const newTasks = tasks.map((task, taskIndex) => {
                if (taskIndex === index) {
                  return { ...task, completed: !task.completed };
                }
                return task;
              });

              const p = calculateOverallProgress(newTasks);
              setProgress(p);
              setTasks(newTasks);
            }}
          >
            <ListItem
              containerStyle={{
                backgroundColor: themeColors.tertiaryShaded[200],
                borderRadius: 40,
                padding: 15,
                margin: 10,
              }}
            >
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    fontFamily: task.completed
                      ? "UrbanistMediumItalic"
                      : "UrbanistMedium",
                    fontSize: 18,
                    color: task.completed
                      ? themeColors.quaternaryShaded[500]
                      : themeColors.quaternaryShaded[900],
                    textDecorationLine: task.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.name}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.CheckBox
                uncheckedColor="white"
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checked={task.completed}
                checkedColor={themeColors.quaternaryShaded[900]}
                // onPress={() => {
                //   if (answer === task) {
                //     setAnswer("");
                //   } else {
                //     setAnswer(task);
                //   }
                // }}
              />
            </ListItem>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    height: 160,
    // maxHeight: 180,
    // justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
  },
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
