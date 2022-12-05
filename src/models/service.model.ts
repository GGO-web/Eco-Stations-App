export interface IService {
  id?: number,
  address?: string;
  rating?: number;
  priceOfService?: number;
  serviceName: string,
  typeOfWastes: Array<string>,
  paymentConditions: Array<string>,
  deliveryOptions: Array<string>,
  description?: string;
  coordinate: {
    id?: number,
    longitude: number,
    latitude: number,
  },
}
