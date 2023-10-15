import { Stack } from "@rneui/layout";
import { Text } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectUser } from "@/utils/redux/features/user/userSlice";
import { useSelector } from "react-redux";
import {
  AttendanceEmoji,
  Calendar,
  ChartFilled,
  TrophyIcon,
  WavingHand,
  WritingHand,
} from "@/components/icons";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function School() {
  const user = useSelector(selectUser);
  return (
    <SafeAreaView
      style={{
        padding: 20,
      }}
    >
      <ScrollView>
        <Stack
          style={{
            flexDirection: "row",
            paddingTop: 40,
            //   backgroundColor:'red',
            paddingVertical: 5,
          }}
          align="center"
        >
          <WavingHand />
          <Text h3> Hi {user?.name},</Text>
        </Stack>
        <Text h4>Check-out your progress...</Text>

        <Stack
          align="center"
          style={{
            flexDirection: "row",
            paddingVertical: 25,
          }}
        >
          <TrophyIcon height={28} />
          <Text h4>My trophies</Text>
          {/* source={require("@/assets/images/Scavenger_hunt.png")} */}
        </Stack>
        <Stack justify="center" align="center">
          <Image source={require("@/assets/images/logo_group.png")} />
        </Stack>
        <Stack
          align="center"
          style={{
            flexDirection: "row",
            paddingVertical: 25,
          }}
        >
          <WritingHand/>
          <Text h4>Overall Performance</Text>
          {/* source={require("@/assets/images/Scavenger_hunt.png")} */}
        </Stack>
        <ChartFilled />
        <Stack
          align="center"
          style={{
            flexDirection: "row",
            paddingVertical: 25,
          }}
        >
       <Calendar/>
          <Text h4>Attendance Tracking</Text>
        </Stack>
        <AttendanceEmoji />
      </ScrollView>
    </SafeAreaView>
  );
}
