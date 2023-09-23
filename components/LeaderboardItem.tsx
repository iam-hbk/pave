import { SafeAreaView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Button, Text, Avatar, ListItem } from "@rneui/themed";

interface LeaderboardItemProps {
  rank: number;
  name: string;
  avatarUrl: string;
  score: number;
}
const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  rank,
  name,
  avatarUrl,
  score,
}) => {
  return (
    <ListItem bottomDivider>
      <ListItem.Content style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ marginRight: 10 }}>#{rank}</Text>
        <Avatar source={{ uri: avatarUrl }} rounded />
        <ListItem.Content>
          <ListItem.Title>{name}</ListItem.Title>
        </ListItem.Content>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Title right>{score}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default LeaderboardItem;
