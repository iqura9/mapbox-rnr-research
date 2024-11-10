import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface MapControlProps {
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
}

export function MapControl({ setZoomLevel }: MapControlProps) {
  return (
    <View className="absolute right-2 top-2 flex flex-col items-center bg-white/80 rounded-lg p-1 shadow-lg">
      <TouchableOpacity
        className="bg-green-500 w-10 h-10 rounded-full items-center justify-center mb-2"
        onPress={() => setZoomLevel((prevLevel) => Math.min(prevLevel + 1, 20))}
      >
        <Icon name="plus" size={20} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-500 w-10 h-10 rounded-full items-center justify-center"
        onPress={() => setZoomLevel((prevLevel) => Math.max(prevLevel - 1, 0))}
      >
        <Icon name="minus" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
