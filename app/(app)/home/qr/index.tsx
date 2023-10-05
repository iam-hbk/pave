import { View, StyleSheet, Platform, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Button } from "@rneui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useFocusEffect } from "expo-router";
import { router } from "expo-router";
// const barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}

const QR = () => {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState<string>();

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };
  useEffect(() => {
    getBarCodeScannerPermissions();
  }, [hasPermission]);
  useFocusEffect(
    React.useCallback(() => {
      // This function is called when the screen comes into focus
      setScanned(false);

      return () => {
        // This function is called when the screen goes out of focus
        setScanned(true);
      };
    }, [])
  );
  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: any;
  }) => {
    setScanned(true); //to pause the scanner after scanning once
    //TODO: Add logic to check if the QR code is valid
    setData(data);
    //The scanned data will be the ID of the class going on. always starts with a "ATDR"
    //TODO: Use this package https://next-qrcode.js.org/demo on the website to generate QR codes
    router.push({
      pathname: "/(app)/home/qr/displayClass",
      params: { classQR: data },
    });
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <Text h3>No access to camera</Text>
        <Button
          title="Allow Camera Access"
          onPress={() => {
            if (Platform.OS === "ios") {
              Linking.openURL("app-settings:");
            } else {
              Linking.openSettings();
            }
          }}
        />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text
        h3
        style={{
          textAlign: "center",
          margin: 20,
        }}
      >
        Scan the QR code given by the lecturer
      </Text>
      <View
        style={{
          flex: 1,
          width: "100%",
          overflow: "hidden",
          borderRadius: 10,
        }}
      >
        {scanned ? (
          <Button
            style={{
              margin: 20,
            }}
            title={"Scan Again"}
            onPress={() => setScanned(false)}
          />
        ) : (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        )}
      </View>
    </View>
  );
};

export default QR;
