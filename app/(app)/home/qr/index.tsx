import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Button } from "@rneui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Dimensions } from "react-native";
import { router } from "expo-router";
// const barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}

const QR = () => {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, [hasPermission]);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: any;
  }) => {
    data = "ATDR24534";
    setScanned(true); //to pause the scanner after scanning once
    //TODO: Add logic to check if the QR code is valid
    //The scanned data will be the ID of the class going on. always starts with a "ATDR"
    //TODO: Use this package https://next-qrcode.js.org/demo on the website to generate QR codes

    router.push(`/(app)/home/qr/${data}`);
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
