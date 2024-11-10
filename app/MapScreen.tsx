import MapboxGL, { Camera, MapView } from "@rnmapbox/maps";
import React, { useRef, useState } from "react";
import { MapControl } from "~/components/MapControl";
import { MarkerLayer } from "~/components/MarkerLayer";
import useMarkers from "~/components/useMarkers";
import { KYIV_COORDS } from "~/utils";

const mapboxToken = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

MapboxGL.setAccessToken(mapboxToken);

function MapScreen() {
  const [zoomLevel, setZoomLevel] = useState(12);

  const mapRef = useRef<MapView | null>(null);
  const coordinatesList = useMarkers({ mapRef, count: 2 });

  return (
    <MapView ref={mapRef} style={{ flex: 1 }}>
      <Camera zoomLevel={zoomLevel} centerCoordinate={KYIV_COORDS} />
      <MarkerLayer coordinatesList={coordinatesList} />

      <MapControl setZoomLevel={setZoomLevel} />
    </MapView>
  );
}

export default MapScreen;
