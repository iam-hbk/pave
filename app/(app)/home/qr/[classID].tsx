import { KeyboardAvoidingView, SafeAreaView, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Text, Input, Icon, useTheme } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getClassInfo } from "@/utils/redux/features/attendance/attendance";

const ScannedData = () => {
  const { classID } = useLocalSearchParams<{ classID: string }>();
  //Should add a key for caching/ invalidating the data
  const { isLoading, isError, data, error } = useQuery([classID], () =>
    getClassInfo(classID)
  );

  if (isLoading) {
    return <Text h3>Loading...</Text>;
  }

  if (isError) {
    return (
      <View>
        <Text h3>Error: {(error as Error).message}</Text>
        <Button
          title={"Try Again"}
          onPress={() => router.replace("../")}
        />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: 15,
        margin: 20,
      }}
    >
      <Text>Scanned Data: {JSON.stringify(data)}</Text>
    </SafeAreaView>
  );
};

export default ScannedData;
