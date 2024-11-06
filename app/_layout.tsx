import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

import "~/global.css"; // Ensure this path is correct and the file exists

export { ErrorBoundary } from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Lab 2, made by Korniienko Oleksandr",
        }}
      />
      <Stack.Screen
        name="aboutMe"
        options={{
          title: "About Me",
        }}
      />
    </Stack>
  );
}
