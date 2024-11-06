import { PortalHost } from "@rn-primitives/portal";
import { SplashScreen, Stack } from "expo-router";
import * as React from "react";
import "~/global.css";


export { ErrorBoundary } from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
   <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Lab 1, made by Korniienko Oleksandr",
          }}
        />
        <Stack.Screen
          name="aboutMe"
          options={{
            title: "About Me",
     
            headerBackTitleVisible: false,
          }}
        />
      </Stack>
      <PortalHost />
      </>
  );
}
