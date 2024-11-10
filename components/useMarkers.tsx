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

      const newCoordinates = Array.from({ length: count }, () =>
        generateRandomCoordinates([KYIV_COORDS[0], KYIV_COORDS[1]], 0.1),
      );

      setCoordinatesList(newCoordinates);
    };

    handleMapReady();
  }, [mapRef, count]);

  return coordinatesList;
}
