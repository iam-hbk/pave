import { View } from "react-native";
import React from "react";
import { router, useGlobalSearchParams } from "expo-router";
import { Button, Text, Chip, Skeleton } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import themeColors from "@/assets/colors";
import { formatDateToHHMM, getDistanceDifference } from "@/utils/helpers";
import Countdown from "@/components/countDown";
import { ScrollView } from "react-native-gesture-handler";
import {
  ErrorBlob,
  OutOfLocationRange,
  WithInLocationRange,
} from "@/components/icons";
import useLocation from "@/hooks/useLocation";
import { getModuleById } from "@/utils/redux/features/modules/modules";
import { useSelector } from "react-redux";
import {
  selectUserId,
  selectUserToken,
} from "@/utils/redux/features/user/userSlice";
import { SessionData } from "@/types";
import Toast from "react-native-toast-message";
import {
  AttendancePost,
  signAttendance,
} from "@/utils/redux/features/attendance/attendance";

type ScannedDataProps = {};
const ScannedData: React.FC<ScannedDataProps> = (props) => {
  const params = useLocalSearchParams();
  const token = useSelector(selectUserToken);
  const studentID = useSelector(selectUserId);

  const { location, locationLoading, errorMsg } = useLocation();
  const [distance, setDistance] = React.useState<number>();
  const [canSignAttendance, setCanSignAttendance] = React.useState<boolean>();
  const [isActive, setIsActive] = React.useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const sessionData: SessionData = JSON.parse(params.classQR as string);
  const onAttendanceConfirmation =
    React.useCallback(async (): Promise<void> => {
      let attendanceData: AttendancePost = {
        // rewardAmount: sessionData.rewardAmount,
        rewardAmount: 50,
        sessionId: sessionData._id,
        studentId: studentID as string,
      };
      try {
        setIsSubmitting(true);
        const res = await signAttendance(attendanceData, token as string);
        Toast.show({
          type: "success",
          position: "top",
          text2: res,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 50,
        });
        router.back();
      } catch (error: any) {
        console.log("ERROR SIGNING ATTENDANCE", error);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: JSON.parse(error.message).message,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 50,
        });
      } finally {
        setIsSubmitting(false);
      }
    }, [sessionData, token, studentID]);

  React.useEffect(() => {
    if (location && sessionData) {
      let d = getDistanceDifference(
        { lat: location.coords.latitude, long: location.coords.longitude },
        {
          lat: sessionData.qrCodeOrigin.lat,
          long: sessionData.qrCodeOrigin.long,
        }
      );
      setDistance(d);
      setCanSignAttendance(d < 2000);
    }
  }, [location, sessionData]);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        gap: 20,
      }}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: themeColors.quaternaryShaded[100],
          gap: 15,
          padding: 20,
          // marginTop: 30,
          // margin: 20,
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
            {sessionData.module.moduleName}
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
            {sessionData.module.moduleCode}
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
            {sessionData.module.lecturer.name}
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
            title={formatDateToHHMM(new Date(sessionData.classStartTime))}
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
            title={formatDateToHHMM(new Date(sessionData.classEndTime))}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: themeColors.quaternaryShaded[100],
          gap: 15,
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text
          h3
          h3Style={{
            textAlign: "center",
            fontSize: 21,
          }}
        >
          Time until the QR code expires
        </Text>
        <Countdown
          onCountdownEnd={() => {
            setIsActive(false);
          }}
          endTime={new Date(sessionData.classEndTime)}
        />
      </View>
      <View
        style={{
          backgroundColor: themeColors.quaternaryShaded[100],
          gap: 15,
          padding: 20,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text
          h3
          h3Style={{
            textAlign: "center",
            fontSize: 21,
          }}
        >
          Geo-sign check
        </Text>
        <Text
          style={{
            textAlign: "center",
          }}
        >
          {!location && locationLoading && "Getting your location..."}
          {distance && canSignAttendance ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: themeColors.success,
                }}
              >
                You are within the required range to sign the attendance
                register
              </Text>
              <WithInLocationRange />
            </View>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: themeColors.error,
                }}
              >
                You are not within the required range to sign the attendance
                register
              </Text>
              <OutOfLocationRange />
            </View>
          )}
        </Text>
      </View>
      <Button
        disabled={!canSignAttendance || !isActive}
        title={"Confirm Attendance"}
        onPress={() => onAttendanceConfirmation()}
        loading={isSubmitting}
      />
    </ScrollView>
  );
};

export default React.memo<ScannedDataProps>(ScannedData);
