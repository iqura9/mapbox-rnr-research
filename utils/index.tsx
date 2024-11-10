export const KYIV_COORDS: [number, number] = [30.5234, 50.4501];

export const generateRandomCoordinates = (center: [number, number], range: number): [number, number] => {
  const randomLng = center[0] + (Math.random() - 0.5) * range;
  const randomLat = center[1] + (Math.random() - 0.5) * range;
  return [randomLng, randomLat];
};
