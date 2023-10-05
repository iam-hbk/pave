import { View } from "react-native";
import React from "react";
import { router } from "expo-router";
import {
  Button,
  Text,
  Input,
  Icon,
  useTheme,
  Chip,
  Skeleton,
} from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import themeColors from "@/assets/colors";
import { formatDateToHHMM, getDistanceDifference } from "@/utils/helpers";
import Countdown from "@/components/countDown";
import { ScrollView } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { set } from "date-fns";
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
import { AttendanceClassProps } from "@/types";
import Toast from "react-native-toast-message";
import {
  AttendancePost,
  signAttendance,
} from "@/utils/redux/features/attendance/attendance";

const ScannedData = () => {
  const params = useLocalSearchParams();
  const classQR: AttendanceClassProps = JSON.parse(params.classQR as string);
  const token = useSelector(selectUserToken);
  const studentID = useSelector(selectUserId);
  const {
    isLoading,
    isError,
    data: module,
    error,
  } = useQuery(["attendance"], () =>
    getModuleById(classQR.module, token as string)
  );

  const { location, locationLoading, errorMsg } = useLocation();
  const [distance, setDistance] = React.useState<number>();
  const [canSignAttendance, setCanSignAttendance] = React.useState<boolean>();
  const [isActive, setIsActive] = React.useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  async function onAttendanceConfirmation(): Promise<void> {
    let attendanceData: AttendancePost = {
      // rewardAmount: classQR.rewardAmount,
      rewardAmount: 50,
      sessionId: classQR._id,
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
      router.replace("../../");
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
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
  }

  React.useEffect(() => {
    if (location && classQR) {
      let d = getDistanceDifference(
        { lat: location.coords.latitude, long: location.coords.longitude },
        { lat: classQR.qrCodeOrigin.lat, long: classQR.qrCodeOrigin.long }
      );
      setDistance(d);
      setCanSignAttendance(d < 2000);
    }
  }, [location, classQR]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          gap: 20,
          padding: 20,
        }}
      >
        <Skeleton
          skeletonStyle={{
            backgroundColor: themeColors.quaternaryShaded[200],
          }}
          style={{
            backgroundColor: themeColors.quaternaryShaded[100],
            flex: 2,
          }}
        />
        <Skeleton
          skeletonStyle={{
            backgroundColor: themeColors.quaternaryShaded[200],
          }}
          style={{
            backgroundColor: themeColors.quaternaryShaded[100],
            flex: 2,
          }}
        />
        <Skeleton
          skeletonStyle={{
            backgroundColor: themeColors.quaternaryShaded[200],
          }}
          style={{
            backgroundColor: themeColors.quaternaryShaded[100],
            flex: 1,
          }}
        />
        <Skeleton
          skeletonStyle={{
            backgroundColor: themeColors.quaternaryShaded[200],
          }}
          style={{
            backgroundColor: themeColors.quaternaryShaded[100],
            flex: 0.5,
            borderRadius: 10,
          }}
        />
      </View>
    );
  }

  if (isError || (errorMsg && errorMsg.length > 0)) {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          h1
          style={{
            color: themeColors.grey3,
            textAlign: "center",
          }}
          h1Style={{
            fontSize: 30,
          }}
        >
          Uhm! someone broke something !{" "}
        </Text>
        <ErrorBlob increaseBy={80} />
        <Text
          h3
          style={{
            color: themeColors.error,
          }}
        >
          Error: {(error as Error).message}
        </Text>
        {errorMsg && <Text h3>Error: {errorMsg}</Text>}
        <Button title={"Try Again"} onPress={() => router.replace("../")} />
      </View>
    );
  }

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
            {module.moduleName}
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
            {module.moduleCode}
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
            {module.lecturer}
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
            title={formatDateToHHMM(new Date(classQR.classStartTime))}
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
            title={formatDateToHHMM(new Date(classQR.classEndTime))}
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
          endTime={new Date(classQR.classEndTime)}
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

export default ScannedData;
