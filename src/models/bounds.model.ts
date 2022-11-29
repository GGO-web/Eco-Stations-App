import { ICoordinate } from './coordinates.model';

export interface IMapOptions {
  center: ICoordinate;
  southWest: ICoordinate;
  northEast: ICoordinate;
}
