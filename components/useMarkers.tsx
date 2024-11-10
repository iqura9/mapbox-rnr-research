import MapboxGL from "@rnmapbox/maps";
import React, { useEffect, useState } from "react";
import { generateRandomCoordinates, KYIV_COORDS } from "~/utils";

interface UseMarkersProps {
  mapRef: React.MutableRefObject<MapboxGL.MapView | null>;
  count: number;
}

export default function useMarkers({ mapRef, count }: UseMarkersProps) {
  const [coordinatesList, setCoordinatesList] = useState<[number, number][]>([]);

  useEffect(() => {
    if (count === 0) return;

    const handleMapReady = async () => {
      if (!mapRef.current) return;

      try {
        const centerCoordinates = KYIV_COORDS;

        if (centerCoordinates && !isNaN(centerCoordinates[0]) && !isNaN(centerCoordinates[1])) {
          const newCoordinates = Array.from({ length: count }, () =>
            generateRandomCoordinates([centerCoordinates[0], centerCoordinates[1]], 0.1),
          );
          setCoordinatesList(newCoordinates);
        } else {
          console.error("Invalid center coordinates:", centerCoordinates);
        }
      } catch (error) {
        console.error("Error retrieving map center:", error);
      }
    };

    handleMapReady();
  }, [mapRef, count]);

  return coordinatesList;
}

// Define MarkerLayer before MapScreen
export function MarkerLayer({ coordinatesList }: { coordinatesList: [number, number][] }) {
  const features = coordinatesList.map((coords) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: coords,
    },
    properties: {
      icon: "custom-marker",
      title: "12",
    },
  }));

  return (
    <>
      <MapboxGL.Images images={{ "custom-marker": require("../assets/images/customMarker.png") }} />

      <MapboxGL.ShapeSource
        id="markerSource"
        shape={{
          type: "FeatureCollection",
          features: features,
        }}
      >
        <MapboxGL.SymbolLayer
          id="markerLayer"
          style={{
            iconImage: "custom-marker",
            iconSize: 1,
            iconAllowOverlap: true,
          }}
        />
      </MapboxGL.ShapeSource>
    </>
  );
}
