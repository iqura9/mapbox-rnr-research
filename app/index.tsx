import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

const HomeScreen = () => {
  return (
    <View className="flex-1 p-4 bg-white">
      <Link href="/MapScreen">Go to Map Screen</Link>
    </View>
  );
};

export default HomeScreen;
