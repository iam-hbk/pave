import { format, addHours } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalToken } from "@/types";
import { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";
import themeColors from "@/assets/colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
interface Coordinate {
  lat: number;
  long: number;
}

export function getDistanceDifference(coord1: Coordinate, coord2: Coordinate) {
  // Radius of the Earth in meters
  const R = 6371000;

  // Convert degrees to radians
  const degToRad = (deg: number) => deg * (Math.PI / 180);

  // Convert latitude and longitude from degrees to radians
  const lat1 = degToRad(coord1.lat);
  const lon1 = degToRad(coord1.long);
  const lat2 = degToRad(coord2.lat);
  const lon2 = degToRad(coord2.long);

  // Calculate differences between coordinates
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate distance in meters
  const distance = R * c;

  return distance;
}

export function formatDateToHHMM(date: Date): string {
  return format(date, "HH:mm");
}

export async function setUserTokenToLocalStorage(
  token: LocalToken
): Promise<void> {
  try {
    await AsyncStorage.setItem("token", JSON.stringify(token));
  } catch (error) {
    console.log("Error setting token:", error);
  }
}

export async function getUserTokenFromLocalStorage(): Promise<LocalToken | null> {
  try {
    const tokenString = await AsyncStorage.getItem("token");
    return tokenString != null ? JSON.parse(tokenString) : null;
  } catch (error) {
    // console.log("Error getting token:", error);
    throw error;
    // return null;
  }
}

/**
 * CONFIGURATION FOR REACT-NATIVE-TOAST-MESSAGE
 */
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      contentContainerProps={{
        style: {
          paddingHorizontal: 15,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      renderTrailingIcon={() => (
        <Feather name="check-circle" size={30} color={themeColors.success} />
      )}
      style={{
        borderLeftColor: themeColors.success,
        padding: 10,
        height: 80,
        maxHeight: 100,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: themeColors.error,
        fontSize: 22,
        fontFamily: "UrbanistMedium",
      }}
      text2Style={{
        fontSize: 18,
        fontFamily: "UrbanistRegular",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      contentContainerProps={{
        style: { paddingHorizontal: 15 },
      }}
      renderTrailingIcon={() => (
        <MaterialIcons
          name="error-outline"
          size={30}
          color={themeColors.error}
        />
      )}
      style={{
        borderLeftColor: themeColors.error,
        padding: 10,
        height: 80,
        maxHeight: 100,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
      text1Style={{
        color: themeColors.error,
        fontSize: 22,
        fontFamily: "UrbanistMedium",
      }}
      text2Style={{
        fontSize: 18,
        fontFamily: "UrbanistRegular",
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
};
