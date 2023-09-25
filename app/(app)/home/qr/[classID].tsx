import { KeyboardAvoidingView, SafeAreaView, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Text, Input, Icon, useTheme, Chip } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getClassInfo } from "@/utils/redux/features/attendance/attendance";
import themeColors from "@/assets/colors";
import { formatDateToHHMM } from "@/utils/helpers";
import Countdown from "@/components/countDown";

const ScannedData = () => {
  const { classID } = useLocalSearchParams<{ classID: string }>();
  //Should add a key for caching/ invalidating the data
  const { isLoading, isError, data, error } = useQuery([classID], () =>
    getClassInfo(classID)
  );

  const { theme } = useTheme();

  if (isLoading) {
    return <Text h3>Loading...</Text>;
  }

  if (isError) {
    return (
      <View>
        <Text h3>Error: {(error as Error).message}</Text>
        <Button title={"Try Again"} onPress={() => router.replace("../")} />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: themeColors.quaternaryShaded[100],
          gap: 15,
          padding: 20,
          marginTop: 30,
          margin: 20,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Module
          </Text>
          <Text
            h4
            h4Style={{
              fontSize: 20,
            }}
            style={{
              color: themeColors.quaternaryShaded[700],
            }}
          >
            {data.moduleName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Module Code
          </Text>
          <Text
            h4
            h4Style={{
              fontSize: 20,
            }}
            style={{
              color: themeColors.quaternaryShaded[700],
            }}
          >
            {data.moduleCode}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Lecturer
          </Text>
          <Text
            h4
            h4Style={{
              fontSize: 20,
            }}
            style={{
              color: themeColors.quaternaryShaded[700],
            }}
          >
            {data.lecturerName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Starts At
          </Text>
          <Chip
            type={"solid"}
            buttonStyle={{
              backgroundColor: themeColors.tertiaryShaded[700],
            }}
            title={formatDateToHHMM(data.classStartTime)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Ends At
          </Text>
          <Chip
            type={"solid"}
            buttonStyle={{
              backgroundColor: themeColors.error,
            }}
            title={formatDateToHHMM(data.classEndTime)}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: themeColors.quaternaryShaded[100],
          gap: 15,
          padding: 20,
          marginTop: 30,
          margin: 20,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-between",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Text
            style={{
              fontSize: 20,
            }}
          >
            The QR code will expire in
          </Text> */}
          <Countdown endTime={data.classEndTime} />
          
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScannedData;
