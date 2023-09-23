import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Avatar, Text, useTheme, ButtonGroup } from "@rneui/themed";
import { Stack } from "@rneui/layout";
import { selectUser, unSetUser } from "@/utils/redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import { PaveCoins, ActivityIcon } from "@/components/icons";
import LeaderboardItem from "@/components/LeaderboardItem";
const Profile = () => {
  //for the button group, leaderboard categories
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const user = useSelector(selectUser);
  console.log(user);
  //will later be coming from the user object
  const userprofilePicture =
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80";
  const dispatch = useDispatch();
  const [scanned, setScanned] = React.useState<boolean>(false);
  const theme = useTheme();

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

    // ... more data
  ];

  const todayLeaders = [
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
      rank: 2,
      name: "Someone",
      score: 450,
      avatarUrl:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    },

    // ... more data
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginVertical: 30,
        marginHorizontal: 15,
      }}
    >
      {/* stack 1 - user name and profile */}
      <Stack
        justify="center"
        align="center"
        style={{
          flex: 3.5,
          // backgroundColor: "lightblue",
        }}
      >
        <Avatar rounded source={{ uri: userprofilePicture }} size={100} />
        <Text h4>{user?.name ? user.name : "Sanah R"}</Text>
      </Stack>
      <Text h4>My Profile</Text>
      {/* stack 2 -  user stats */}
      <Stack
        style={{
          flex: 3,
            margin:0,
            padding:0,
          // backgroundColor: "lightpink",
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
      </Stack>
      {/* stack 3 - leaderboard */}
      <Text h4 h4Style={{ marginVertical: 15 }}>
        Leaderboard
      </Text>

      <ButtonGroup
        buttons={["All time", "Today"]}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
      ></ButtonGroup>
      <Stack>
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
      </Stack>

      <Button onPress={() => handleLogout()}>Logout</Button>
    </SafeAreaView>
  );
};

export default Profile;
