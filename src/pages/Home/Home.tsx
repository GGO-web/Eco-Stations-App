import React from 'react';

import { ICoordinate } from '../../models/coordinates.model';

import { Map } from '../../components/Map/Map';
import { Loader } from '../../components/Loader/Loader';

export function Home({ isLoaded }: { isLoaded: boolean }) {
  const center: ICoordinate = {
    lat: 50.450001,
    lng: 30.523333,
  };

  return isLoaded
    ? <Map center={center} />
    : <Loader />;
}
