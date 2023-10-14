import { ScrollView, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Text } from "@rneui/themed";
import axios from "axios";
import { BarCodeScanner } from "expo-barcode-scanner";

import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectUserToken,
  setUser,
} from "@/utils/redux/features/user/userSlice";
import themeColors from "@/assets/colors";
import { LinearGradient } from "expo-linear-gradient";
import DailyQuestion from "@/components/dailyQuestion";
import { Coin } from "@/components/icons";
import { Ionicons } from "@expo/vector-icons";
import RankingCard from "@/components/rankCard";
import { QuizData, User } from "@/types";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import QuizList from "@/components/quizList";
import { getQuizzesByModuleId } from "@/utils/redux/features/questions/question";
import api from "@/utils/redux/api";
import Toast from "react-native-toast-message";

type Props = {};

const Index = (props: Props) => {
  const insets = useSafeAreaInsets();
  const user = useSelector(selectUser) as User;
  const token = useSelector(selectUserToken);
  const [quizData, setQuizData] = React.useState<QuizData>(); // [quizData, setQuizData
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  const getBarCodeScannerPermissions = async (): Promise<void> => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };
  useEffect(() => {
    getBarCodeScannerPermissions();
  }, [hasPermission]);

  const [isModalQuestionVisible, setIsModalQuestionVisible] =
    React.useState<boolean>(false);

  async function getQuizById() {
    const bearerToken = `Bearer ${token}`; // Rename to avoid shadowing
    const id = "6529e1e5d837478f21eff205";

    try {
      const response = (await api
        .auth(bearerToken)
        .get(`/quiz/${id}`)) as QuizData;
      setQuizData(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching quiz by ID:", error);
    }
  }
  const handleBarCodeScanned = React.useCallback(
    ({ type, data }: { type: string; data: any }) => {
      if (typeof data === "string") {
        setScanned(true);
        console.log("data", data);
        router.push({
          pathname: "/(app)/home/qr/displayClass",
          params: { classQR: data },
          // params: { classQR: decryptTheQrCode(data) },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid QR Code",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    },
    []
  );
  useEffect(() => {
    getQuizById();
  }, []); // Note that we just reference the function in the dependency array, not call it

  return (
    <ScrollView
      style={{
        flex: 1,
        // paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: themeColors.white,
      }}
      contentContainerStyle={{
        // flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 20,
        paddingHorizontal: 25,
        gap: 25,
      }}
    >
      <View
        style={{
          alignItems: "flex-start",
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <Text
          h2
          h2Style={{
            textTransform: "capitalize",
          }}
        >
          👋🏽 Hi {user?.name.split(" ")[0]},
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: themeColors.grey2,
          }}
        >
          Great to see you again !
        </Text>
        <Text>{JSON.stringify(quizData)}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 150,
          //shadow
          shadowColor: themeColors.tertiaryDark,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <LinearGradient
          colors={[
            themeColors.tertiaryShaded[200],
            themeColors.tertiaryShaded[500],
            themeColors.tertiaryShaded[400],
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            padding: 10,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            // width: "100%",
            // height: "22%",
            borderRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
            }}
          >
            <View
              style={{
                width: 70,
                height: 70,
                //   padding: 30,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: themeColors.tertiaryShaded[200],
                borderRadius: 100,
                borderWidth: 3,
                borderColor: themeColors.tertiaryDark,
                //shadows
                shadowColor: themeColors.tertiaryLight,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                elevation: 5,
              }}
            >
              <Coin color={themeColors.tertiaryDark} increaseBy={5} />
            </View>
            <View>
              <Text
                h2
                h2Style={{
                  fontSize: 30,
                  fontFamily: "UrbanistBlack",
                  color: themeColors.tertiaryShaded[900],
                }}
              >
                {user?.wallet}
              </Text>
              <Text>Pave coins</Text>
            </View>
          </View>
          <View
            style={{
              borderLeftWidth: 1,
              // width: 4,
              height: "75%",
              borderLeftColor: themeColors.tertiaryShaded[800],
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
            }}
          >
            <View
              style={{
                width: 70,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: themeColors.tertiaryShaded[200],
                borderRadius: 100,
                borderWidth: 3,
                borderColor: themeColors.tertiaryDark,
                //shadows
                shadowColor: themeColors.tertiary,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                elevation: 5,
              }}
            >
              <Ionicons
                name="ios-trophy"
                size={28}
                color={themeColors.tertiaryDark}
              />
            </View>
            <RankingCard />
          </View>
        </LinearGradient>
      </View>
      <Text
        h2
        h2Style={{
          alignSelf: "flex-start",
          fontSize: 25,
          fontFamily: "UrbanistBold",
          color: themeColors.grey4,
        }}
      >
        ☀️ Daily Quiz
      </Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 150,
        }}
      >
        <DailyQuestion
          parentHeight={150}
          style={{ height: "100%" }}
          containerStyle={{ height: "100%", justifyContent: "center" }}
          isModalQuestionVisible={isModalQuestionVisible}
          setIsModalQuestionVisible={setIsModalQuestionVisible}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text
          h2
          h2Style={{
            fontSize: 25,
            fontFamily: "UrbanistBold",
            color: themeColors.grey4,
          }}
        >
          ✍🏽 Class Quizz
        </Text>
        <TouchableOpacity
          onPress={() => console.log("pressed")}
          style={{
            padding: 10,
            borderRadius: 100,
          }}
        >
          <Ionicons name="ios-filter" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/*maybe when it's clicked,redirect to QR CODE page that will handle both attendance and QUizzes  */}
      <Button>Scan QR Code</Button>
      {/* <View
        style={{
          height: 300,
          width: "100%",
        }}
      >
        <Text>Hi</Text>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View> */}
      <QuizList />
    </ScrollView>
  );
};

export default Index;
