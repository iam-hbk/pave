import { View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Button, Text, Input, Icon, useTheme, Chip } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getClassInfo } from "@/utils/redux/features/attendance/attendance";
import themeColors from "@/assets/colors";
import { formatDateToHHMM, getDistanceDifference } from "@/utils/helpers";
import Countdown from "@/components/countDown";
import { ScrollView } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { set } from "date-fns";
import { OutOfLocationRange, WithInLocationRange } from "@/components/icons";
import useLocation from "@/hooks/useLocation";
const ScannedData = () => {
  const { classID } = useLocalSearchParams<{ classID: string }>();
  const { isLoading, isError, data, error } = useQuery([classID], () =>
    getClassInfo(classID)
  );

  const { location, locationLoading, errorMsg } = useLocation();
  const [distance, setDistance] = React.useState<number>();

  const onAttendanceConfirmation = () => {
    alert("Attendance Confirmed");
    router.replace("../");
  };

  React.useEffect(() => {
    if (location && data) {
      let d = getDistanceDifference(
        { lat: location.coords.latitude, long: location.coords.longitude },
        { lat: data.qrCodeOrigin.lat, long: data.qrCodeOrigin.long }
      );
      console.log("Distance:", d);
      setDistance(d);
    }
  }, [location, data]);

  if (isLoading) {
    return <Text h3>Loading...</Text>;
  }

  if (isError || (errorMsg && errorMsg.length > 0)) {
    return (
      <View>
        <Text h3>Error: {(error as Error).message}</Text>
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
        <Countdown endTime={data.classEndTime} />
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
          {distance && distance < 100 ? (
            <WithInLocationRange />
          ) : (
            <OutOfLocationRange />
          )}
        </Text>
      </View>
      <Button
        title={"Confirm Attendance"}
        onPress={() => onAttendanceConfirmation()}
      />
    </ScrollView>
  );
};

export default ScannedData;
