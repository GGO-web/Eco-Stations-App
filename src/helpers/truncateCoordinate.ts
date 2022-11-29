export function truncateCoordinate(num: number, places: number = 6) {
  return parseFloat(num.toFixed(places));
}
