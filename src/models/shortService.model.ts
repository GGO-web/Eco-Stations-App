export interface IShortService {
  id?: number,
  serviceName: string,
  rating?: number,
  coordinate: {
    id?: number,
    longitude: number,
    latitude: number,
  },
}
