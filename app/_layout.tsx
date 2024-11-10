import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

import "~/global.css";
export { ErrorBoundary } from "expo-router";

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
          title: "Korniienko Oleksandr research",
        }}
      />
      <Stack.Screen
        name="aboutMe"
        options={{
          title: "About Me",
        }}
      />
      <Stack.Screen
        name="MapScreen"
        options={{
          title: "Mapbox-map",
        }}
      />
    </Stack>
  );
}
