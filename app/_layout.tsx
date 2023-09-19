import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  // ThemeProvider,
} from "@react-navigation/native";
import { ThemeProvider, createTheme, lightColors,darkColors } from "@rneui/themed";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack, router } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Platform } from "react-native";

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: darkColors.platform.android,
      // ios: lightColors.platform.ios,
    }),
  },
  components: {
    Button: {
      buttonStyle: {
        borderRadius: 7,
        padding: 10,
        paddingHorizontal: 20,
      },
    },
  },
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // Get this from the local storage to check if the user is logged in or not.
  const isLoggedIn = false; // Replace this with actual logic
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/home");
    } else {
      router.replace("/welcome");
    }
  }, []); // Empty dependency array means this useEffect runs once after the initial render

  return (
    <ThemeProvider
      /* value={colorScheme === "dark" ? DarkTheme : DefaultTheme} */ theme={
        theme
      }
    >
      <Slot />
    </ThemeProvider>
  );
}
