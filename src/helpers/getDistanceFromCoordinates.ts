import { ICoordinate } from '../models/coordinates.model';

export function getDistanceFromCoordinates(coords1: ICoordinate, coords2: ICoordinate) {
  const R = 6378.137; // Radius of earth in KM

  const dLat = (coords2.lat * Math.PI) / 180 - (coords1.lat * Math.PI) / 180;
  const dLon = (coords2.lng * Math.PI) / 180 - (coords1.lng * Math.PI) / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
  + Math.cos((coords1.lat * Math.PI) / 180) * Math.cos((coords2.lat * Math.PI) / 180)
  * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d; // kilometers
}
