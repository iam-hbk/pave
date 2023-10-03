import { format, addHours } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast, { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";
import themeColors from "@/assets/colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { LocalStorageUser, User } from "@/types";
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

export function formatDate(dateString: string): string {
  const months: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date(dateString);
  let day: number = date.getDate();
  const month: string = months[date.getMonth()];
  const year: number = date.getFullYear();
  let hour: number = date.getHours();
  let minute: number = date.getMinutes();

  // Add suffix to the day (st, nd, rd, th)
  const daySuffix: string = (day % 10 === 1 && day !== 11)
    ? 'st'
    : (day % 10 === 2 && day !== 12)
    ? 'nd'
    : (day % 10 === 3 && day !== 13)
    ? 'rd'
    : 'th';

  // Format hours and minutes to be always two digits
  const hourStr: string = hour < 10 ? '0' + hour : hour.toString();
  const minuteStr: string = minute < 10 ? '0' + minute : minute.toString();

  return `${day}${daySuffix} ${month} ${year} at ${hourStr}:${minuteStr}`;
}



export async function setUserTokenToLocalStorage(token: LocalStorageUser): Promise<void> {
  try {
    await AsyncStorage.setItem("token", JSON.stringify(token));
  } catch (error) {
    console.log("Error saving user token to local storage", error);
    Toast.show({
      type: "error",
      position: "top",
      text1: "Error",
      text2: "An error occurred while trying to save your login details",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
    });
  }
}

export async function getUserTokenFromLocalStorage(): Promise<LocalStorageUser | null> {
  try {
    const tokenString = await AsyncStorage.getItem("token");
    return tokenString ? JSON.parse(tokenString) : null;
  } catch (error) {
    console.log("Error getting user token to local storage", error);
    Toast.show({
      type: "error",
      position: "top",
      text1: "Error",
      text2: "An error occurred while trying to get local details",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
    });
    return null;
  }
}

export async function removeUserTokenFromLocalStorage(): Promise<void> {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    throw error;
  }
}

//function to keep track of the user's ranking locally
export async function setRankingToLocalStorage(ranking: number): Promise<void> {
  try {
    await AsyncStorage.setItem("ranking", JSON.stringify(ranking));
  } catch (error) {
    throw error;
  }
}

export async function getRankingFromLocalStorage(): Promise<number | null> {
  try {
    const rankingString = await AsyncStorage.getItem("ranking");
    return rankingString ? JSON.parse(rankingString) : null;
  } catch (error) {
    throw error;
  }
}

export async function removeRankingFromLocalStorage(): Promise<void> {
  try {
    await AsyncStorage.removeItem("ranking");
  } catch (error) {
    throw error;
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
