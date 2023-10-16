import FontAwesome from "@expo/vector-icons/FontAwesome";
import { store } from "@/utils/redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@rneui/themed";
import React from "react";
import fonts from "@/assets/fonts";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect } from "react";
import theme from "@/assets/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { getUserTokenFromLocalStorage, toastConfig } from "@/utils/helpers";
import { setUser } from "@/utils/redux/features/user/userSlice";
import { getUser } from "@/utils/redux/features/user/user";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Create a client
const queryClient = new QueryClient();

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
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" />
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "fade",
                
              }}
            />
          </SafeAreaProvider>
          <Toast config={toastConfig} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
