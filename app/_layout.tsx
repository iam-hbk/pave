import FontAwesome from "@expo/vector-icons/FontAwesome";
// import {
//   DarkTheme,
//   DefaultTheme,
//   // ThemeProvider,
// } from "@react-navigation/native";
import { store } from "@/utils/redux/store";
import { Provider } from "react-redux";
import {
  ThemeProvider,
  createTheme,
  lightColors,
  darkColors,
} from "@rneui/themed";

import fonts from "@/assets/fonts";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Platform } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
        padding: 15,
        paddingHorizontal: 20,
      },
      titleStyle: {
        fontFamily: "UrbanistRegular",
      },
    },
    Text: {
      style: {
        fontFamily: "UrbanistRegular",
      },
      h1Style: {
        fontFamily: "UrbanistBold",
      },
      h2Style: {
        fontFamily: "UrbanistSemiBold",
      },
    },
    Input: {
      inputStyle: {
        fontFamily: "UrbanistRegular",
      },
    },
  },
  fonts: {
    regular: "UrbanistRegular",
    bold: "UrbanistBold",
    italic: "UrbanistItalic",
    // ... add other font styles as needed
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
    ...fonts,
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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          /* value={colorScheme === "dark" ? DarkTheme : DefaultTheme} */ theme={
            theme
          }
        >
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "fade",
            }}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
