import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Button, Text, useTheme } from "@rneui/themed";
import { Stack } from "@rneui/layout";
import {
  selectUser,
  unSetUser,
  updateUser,
} from "@/utils/redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";


const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = React.useState<boolean>();
  const [scanned, setScanned] = React.useState<boolean>(false);
  const theme = useTheme();

  const handleLogout = () => {
    dispatch(unSetUser());
    router.replace("/(auth)/welcome");
  };
  React.useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    alert(
      `Bar code with type ${type} and data ${JSON.stringify(
        data
      )} has been scanned!`
    );
  };

  if (user) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "red",
        }}
      >
        <View
          style={{
            width: "60%",
            height: "60%",
            backgroundColor: "white",
          }}
        >
          {/* Just for testing */}
          {/* <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          /> */}
        </View>
        <Stack
          justify="center"
          align="center"
          style={{
            flex: 1,
          }}
        >
          {/* <Button onPress={() => handleLogout()}>Logout</Button> */}
          {scanned && (
            <Button onPress={() => setScanned(false)}>Tap to Scan</Button>
          )}
        </Stack>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Stack
          justify="center"
          align="center"
          style={{
            flex: 1,
          }}
        >
          <Text h1>Profile Screen</Text>
        </Stack>
      </SafeAreaView>
    );
  }
};

export default Profile;
