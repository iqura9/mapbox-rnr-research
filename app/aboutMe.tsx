import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";

const AVATAR_IMAGE = "https://avatars.githubusercontent.com/u/77846496?v=4";

const AboutMeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl">About Me</Text>
      <Avatar alt={"image"} className="w-24 h-24">
        <AvatarImage source={{ uri: AVATAR_IMAGE }} className="w-full h-full" />
      </Avatar>
      <Text className="text-lg mt-4">Korniienko Oleksandr</Text>
      <Text className="text-lg mt-4">Group: TTP-41</Text>
      <Link href="/">
        <Text>Go to home screen!</Text>
      </Link>
    </View>
  );
};

export default AboutMeScreen;
