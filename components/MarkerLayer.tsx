import MapboxGL from "@rnmapbox/maps";
import React from "react";

export function MarkerLayer({ coordinatesList }: { coordinatesList: [number, number][] }) {
  const features: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: coordinatesList.map((coords) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: coords,
      },
      properties: {},
    })),
  };

  return (
    <>
      <MapboxGL.Images images={{ "custom-marker": require("../assets/images/customMarker.png") }} />

      <MapboxGL.ShapeSource id="markerSource" shape={features}>
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
