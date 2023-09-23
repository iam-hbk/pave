import { View, StyleSheet } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { selectQuestionById } from "@/utils/redux/features/questions/questionSlice";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Text, useTheme } from "@rneui/themed";
import themeColors from "@/assets/colors";
import { ListItem } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

const DailyQuestion = () => {
  const params = useLocalSearchParams<{ dailyQuestionId: string }>();
  const [answer, setAnswer] = React.useState<string>("");
  const question = useSelector(selectQuestionById(params.dailyQuestionId));
  const { theme } = useTheme();
  console.log("[DAILY-QUESTION]", JSON.parse(params.dailyQuestionId));

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <LinearGradient
        colors={["rgba(91, 136, 217, 0.50)", "rgb(204, 218, 243)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      <View
        style={{
          padding: 20,
          flex: 1,
          gap: 30,
        }}
      >
        <Text
          h1
          style={{
            textAlign: "center",
            marginBottom: 20,
            color: theme.colors.white,
          }}
        >
          Question of the day
        </Text>
        <Text
          h2
          style={{
            textAlign: "center",
            marginBottom: 20,
            color: theme.colors.white,
          }}
        >
          {question?.question}
        </Text>
        <View>
          {question?.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (answer === option) {
                  setAnswer("");
                } else {
                  setAnswer(option);
                }
              }}
            >
              <ListItem
                containerStyle={{
                  // backgroundColor: themeColors.quaternaryShaded[300],
                  borderRadius: 10,
                  padding: 20,
                  marginBottom: 10,
                }}
              >
                <ListItem.Content
                  style={
                    {
                      // backgroundColor: themeColors.quaternaryShaded[300],
                    }
                  }
                >
                  <ListItem.Title
                    style={{
                      fontFamily: "UrbanistMedium",
                      fontSize: 20,
                      // color: themeColors.quaternaryShaded[900],
                    }}
                  >
                    {option}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.CheckBox
                  containerStyle={
                    {
                      // backgroundColor: themeColors.quaternaryShaded[300],
                    }
                  }
                  uncheckedColor={themeColors.quaternaryShaded[900]}
                  // Use ThemeProvider to change the defaults of the checkbox
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checked={answer === option}
                  checkedColor={themeColors.quaternaryShaded[900]}
                  onPress={() => {
                    if (answer === option) {
                      setAnswer("");
                    } else {
                      setAnswer(option);
                    }
                  }}
                />
              </ListItem>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          title={"Submit"}
          buttonStyle={{
            backgroundColor: themeColors.quaternaryShaded[900],
          }}
          onPress={() => {
            /* Add Submitting logic here */
            router.push("../");
          }}
        />
      </View>
    </View>
  );
};

export default DailyQuestion;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    width: "100%",
  },
});
