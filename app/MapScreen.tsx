import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const [randomPoint, setRandomPoint] = useState<LatLng | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Дозвіл на доступ до локації відхилено");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const generateRandomPoint = () => {
    if (!currentLocation) return;

    const radius = 0.05; // Приблизно 5 км
    const randomLatitude = currentLocation.latitude + (Math.random() - 0.5) * radius;
    const randomLongitude = currentLocation.longitude + (Math.random() - 0.5) * radius;

    setRandomPoint({
      latitude: randomLatitude,
      longitude: randomLongitude,
    });

    // Оновлюємо маршрут
    setRouteCoordinates([currentLocation, { latitude: randomLatitude, longitude: randomLongitude }]);
  };

  return (
    <View className="flex-1">
      {currentLocation && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker coordinate={currentLocation} title="Ваша поточна локація" />
          {randomPoint && <Marker coordinate={randomPoint} title="Випадкова точка" />}
          {routeCoordinates.length > 1 && (
            <Polyline coordinates={routeCoordinates} strokeColor="#000" strokeWidth={3} />
          )}
        </MapView>
      )}
      <TouchableOpacity
        className="absolute bottom-10 left-10 right-10 bg-blue-500 p-4 rounded"
        onPress={generateRandomPoint}
      >
        <Text className="text-white text-center text-lg">Побудувати маршрут до випадкової точки</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;
