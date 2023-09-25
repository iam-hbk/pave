import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "@rneui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Dimensions } from "react-native";
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
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: {} }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
          width: width,
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    </View>
  );
};

export default QR;
