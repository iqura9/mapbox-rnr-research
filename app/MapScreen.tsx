import MapboxGL, { Camera, MapView } from "@rnmapbox/maps";
import React from "react";
import { View } from "react-native";

const mapboxToken = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

MapboxGL.setAccessToken(mapboxToken);

const KYIV_COORDS: [number, number] = [30.5234, 50.4501];

const MapScreen = () => {
  return (
    <View className="flex-1 h-[300px] w-full">
      <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/streets-v12">
        <Camera zoomLevel={12} centerCoordinate={KYIV_COORDS}></Camera>
      </MapView>
    </View>
  );
};

export default MapScreen;
