import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";

const AboutMeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl">About Me</Text>
      <Text className="text-lg mt-4">
        This is a brief description about me.
      </Text>
      <Text className="text-lg mt-4">Korniienko Oleksandr</Text>
      <Text className="text-lg mt-4">Group: TTP-41</Text>
      <Link href="/">
        <Text>Go to home screen!</Text>
      </Link>
    </View>
  );
};

export default AboutMeScreen;
