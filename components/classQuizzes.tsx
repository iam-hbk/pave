import { TouchableOpacity, View } from "react-native";
import React from "react";
import { ListItem, Text, Button, Avatar } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import themeColors from "@/assets/colors";
import ClassQuizModal from "./classQuizzesModal";
import { QuizData } from "@/types";
import { ModuleType } from "@/types/module";
import { useQuery } from "@tanstack/react-query";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getQuizzesByModuleId } from "@/utils/redux/features/questions/question";
import { useSelector } from "react-redux";
import { selectUserToken } from "@/utils/redux/features/user/userSlice";

type Props = {
  module: ModuleType;
};

const ClassQuizes = ({ module }: Props) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const token = useSelector(selectUserToken);
  const {
    data: quizzes,
    isLoading,
    error,
  } = useQuery([`quiz${module.moduleCode}`, module._id, token], () =>
    getQuizzesByModuleId(module._id, token as string)
  );

  if (isLoading) {
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
        <Text>Loading Quiz...</Text>
      </View>
    );
  }
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

  //   console.log("\n\n\nQUIZZZZZZ", JSON.stringify(quizzes, null, 2));
  //   return null;
  return (
    <View style={{ width: "100%" }}>
      {quizzes && quizzes.length > 0 && (
        <ClassQuizModal
          quizzes={quizzes}
          modalVisible={expanded}
          setModalVisible={setExpanded}
        />
      )}
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
              title={module.moduleCode}
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
              {module.moduleName}
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
