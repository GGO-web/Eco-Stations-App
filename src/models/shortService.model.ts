export interface IShortService {
  id?: number,
  serviceName: string,
  coordinate: {
    id?: number,
    longitude: number,
    latitude: number,
  },
}
