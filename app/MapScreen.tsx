import MapboxGL from "@rnmapbox/maps";
import React, { useRef } from "react";
import useMarkers, { MarkerLayer } from "~/components/useMarkers";
import { KYIV_COORDS } from "~/utils";

const mapboxToken = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

MapboxGL.setAccessToken(mapboxToken);

function MapScreen() {
  const mapRef = useRef<MapboxGL.MapView | null>(null);
  const coordinatesList = useMarkers({ mapRef, count: 2 });

  return (
    <MapboxGL.MapView ref={mapRef} style={{ flex: 1 }}>
      <MapboxGL.Camera zoomLevel={12} centerCoordinate={KYIV_COORDS} />

      <MarkerLayer coordinatesList={coordinatesList} />
    </MapboxGL.MapView>
  );
}

export default MapScreen;
