import { SafeAreaView, StyleSheet, Dimensions, ScrollView } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import {
  Button,
  Avatar,
  Text,
  useTheme,
  ButtonGroup,
  Card,
  LinearProgress,
} from "@rneui/themed";
import { Stack } from "@rneui/layout";
import { selectUser, unSetUser } from "@/utils/redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { PaveCoins, ActivityIcon, TrophyIcon } from "@/components/icons";
import LeaderboardItem from "@/components/leaderboardItem";

const Profile = () => {
  //for the button group, leaderboard categories
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const user = useSelector(selectUser);
  //will later be coming from the user object
  const userprofilePicture =
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80";
  const dispatch = useDispatch();
const {width,height} = Dimensions.get('window')
  const handleLogout = () => {
    dispatch(unSetUser());
    router.replace("/(auth)/welcome");
  };

  //dummy data for leaderboard
  const allTimeLeaders = [
    {
      id: 1,
      rank: 1,
      name: "John Doe",
      score: 500,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 2,
      rank: 2,
      name: "Someone",
      score: 450,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 3,
      rank: 3,
      name: "Kenan",
      score: 430,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 4,
      rank: 4,
      name: "Heritier",
      score: 410,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 5,
      rank: 5,
      name: "Sanah",
      score: 390,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 6,
      rank: 6,
      name: "Philiswa",
      score: 375,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 7,
      rank: 7,
      name: "Israel",
      score: 360,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 8,
      rank: 8,
      name: "Aaron",
      score: 345,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 9,
      rank: 9,
      name: "Elena",
      score: 330,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 10,
      rank: 10,
      name: "Carlos",
      score: 315,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
  ];

  const todayLeaders = [
    {
      id: 1,
      rank: 1,
      name: "Sam",
      score: 50,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 2,
      rank: 2,
      name: "Jo",
      score: 45,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 3,
      rank: 3,
      name: "Kenan",
      score: 43,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 4,
      rank: 4,
      name: "Heritier",
      score: 41,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 5,
      rank: 5,
      name: "Sanah",
      score: 39,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 6,
      rank: 6,
      name: "Philiswa",
      score: 37,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 7,
      rank: 7,
      name: "Israel",
      score: 36,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 8,
      rank: 8,
      name: "Aaron",
      score: 34,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 9,
      rank: 9,
      name: "Elena",
      score: 33,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
    {
      id: 10,
      rank: 10,
      name: "Carlos",
      score: 31,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginVertical: 30,
        marginHorizontal: 15,
        // backgroundColor:'white'
      }}
    >
      <ScrollView>
        {/* stack 1 - user name and profile */}
        <Stack
          justify="center"
          align="center"
          style={{
            padding: 10,
          }}
        >
          <Avatar rounded source={{ uri: userprofilePicture }} size={100} />
          <Text h4>{user ? user?.name : "Sanah R"}</Text>
        </Stack>
        <Text h4>My Profile</Text>
        {/* stack 2 -  user stats */}
        <Stack
          style={{
            backgroundColor: "white",
            margin: 5,
            paddingVertical: 15,
            borderRadius: 10,
          }}
          row
          justify="space-around"
          align="center"
        >
          <Stack justify="center" align="center">
            <ActivityIcon />
            <Text>50</Text>
            <Text>Activities Completed</Text>
          </Stack>
          <Stack justify="center" align="center">
            <PaveCoins />
            <Text>1000</Text>

            <Text>Coins Earned</Text>
          </Stack>
          <Stack justify="center" align="center">
            <TrophyIcon />
            <Text>0</Text>

            <Text>Trophies unlocked</Text>
          </Stack>
        </Stack>
        {/* stack 3 - leaderboard */}
        <Text h4 h4Style={{ marginVertical: 15 }}>
          Leaderboard
        </Text>
        <ButtonGroup
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomWidth: 0, // Remove the bottom border
            borderTopWidth: 0, // Remove the top border
            borderLeftWidth: 0, // Remove the left border
            borderRightWidth: 0, // Remove the right border
          }}
          buttons={["All time", "Today"]}
          textStyle={{
            color: "black",
          }}
          selectedTextStyle={{
            color: "black",
          }}
          selectedButtonStyle={{
            backgroundColor: "transparent", // Set the background to transparent
            borderBottomColor: "#ffc501",
            borderBottomWidth: 2, // Add a bottom border to the selected button
          }}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
        />

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            // width: width,
            // height: height,
          }}
          keyboardShouldPersistTaps="handled"
          style={{
            padding: 10,
            height: 250,
          }}
        >
          {selectedIndex === 0
            ? allTimeLeaders.map((leader) => (
                <LeaderboardItem
                  key={leader.id}
                  rank={leader.rank}
                  name={leader.name}
                  avatarUrl={leader.avatarUrl}
                  score={leader.score}
                />
              ))
            : todayLeaders.map((leader) => (
                <LeaderboardItem
                  key={leader.id}
                  rank={leader.rank}
                  name={leader.name}
                  avatarUrl={leader.avatarUrl}
                  score={leader.score}
                />
              ))}
        </ScrollView>
        {/* stack 4 - achievement */}
        <Text h4 h4Style={{ marginVertical: 7 }}>
          Achievements
        </Text>
        {/* <Stack justify="center" align="center"> */}
        <Card>
          <Card.Title>Pave Boss</Card.Title>
          <Text>Complete 100 activities</Text>
          <LinearProgress value={0.5} />
          <Card.Divider />
        </Card>
        {/* </Stack>/ */}

        {/* <Button onPress={() => handleLogout()}>Logout</Button> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
