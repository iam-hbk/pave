import { View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { Icon, ListItem, Text } from "@rneui/themed";
import { BlurView } from "expo-blur";
import themeColors from "@/assets/colors";
import { QuizData } from "@/types";

type Props = {
  quizzes: QuizData[];
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ClassQuizModal = ({ quizzes, modalVisible, setModalVisible }: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <BlurView
        tint="dark"
        intensity={30}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
        }}
      >
        <View
          style={{
            height: "auto",
            minHeight: "50%",
            width: "100%",
            justifyContent: "center",
            padding: 20,
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "#fdfdfd",
            position: "relative",
          }}
        >
          <View style={{ position: "absolute", top: 15, right: 15 }}>
            <Icon
              name="close"
              type="ant-design"
              size={30}
              color={themeColors.grey2}
              onPress={() => setModalVisible(false)}
            />
          </View>
          <Text
            h2
            h2Style={{
              position: "absolute",
              top: 15,
              left: 25,
              fontFamily: "UrbanistBold",
              color: themeColors.quaternaryShaded[400],
            }}
          >
            Quizzes
          </Text>
          {quizzes.map((quiz) => (
            <ListItem
              Component={TouchableOpacity}
              style={{
                width: "100%",
                marginBottom: 10,
              }}
              containerStyle={{
                borderRadius: 10,
                backgroundColor: themeColors.quaternaryShaded[100],
              }}
              key={quiz._id}
              onPress={() => console.log(quiz._id)}
            >
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    fontFamily: "UrbanistBold",
                    fontSize: 18,
                    color: themeColors.black,
                    textTransform: "capitalize",
                  }}
                >
                  {quiz.title}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{
                    fontFamily: "UrbanistRegular",
                    fontSize: 16,
                    color: themeColors.grey2,
                  }}
                >
                  {quiz.questions.length} Question
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </BlurView>
    </Modal>
  );
};

export default ClassQuizModal;
