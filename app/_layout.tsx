import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";
import "~/global.css"; // Ensure this path is correct and the file exists
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export { ErrorBoundary } from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const theme = await AsyncStorage.getItem("theme");

        if (Platform.OS === "web") {
          // Adds the background color to the html element to prevent white background on overscroll.
          document.documentElement.classList.add("bg-background");
        }

        if (!theme) {
          await AsyncStorage.setItem("theme", colorScheme);
          setIsColorSchemeLoaded(true);
          return;
        }

        const colorTheme = theme === "dark" ? "dark" : "light";
        if (colorTheme !== colorScheme) {
          setColorScheme(colorTheme);
        }

        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, [colorScheme, setColorScheme]);

  if (!isColorSchemeLoaded) {
    return null; // Show nothing while loading the color scheme
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Lab 1, made by Korniienko Oleksandr",
            headerRight: () => <ThemeToggle />,
          }}
        />
        <Stack.Screen
          name="aboutMe"
          options={{
            title: "About Me",
            headerRight: () => <ThemeToggle />,
            headerBackTitleVisible: false,
          }}
        />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}
