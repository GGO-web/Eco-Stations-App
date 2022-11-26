import React from 'react';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { defaultTheme } from './Theme';

import { useActions } from '../../hooks/actions';

import { ICoordinate } from '../../models/coordinates.model';
import { IService } from '../../models/service.model';

import { trashBins } from '../../constants';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme,
};

export function Map({
  center,
}: {
  center: ICoordinate;
}) {
  // const { data: trashBins } = useGetAllServicesQuery();

  const { setPopupState, setCurrentService } = useActions();

  const handleClick = (trashBinService: IService) => {
    setPopupState(true);
    setCurrentService(trashBinService);
  };

  const handleOnLoad = (map: google.maps.Map) => {
    // const bounds = new google.maps.LatLngBounds();
    // trashBins.forEach((trashBin: IService) => bounds.extend(
    //   {
    //     lat: trashBin.coordinate.longitude,
    //     lng: trashBin.coordinate.latitude,
    //   },
    // ));
    // map.fitBounds(bounds);
  };

  console.log(trashBins);

  const position = {
    lat: 37.772,
    lng: -122.214,
  };

  const onLoad = (marker: any) => {
    console.log('marker: ', marker);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={handleOnLoad}
      options={defaultOptions}
    >
      <Marker
        visible
        onLoad={onLoad}
        position={position}
      />
    </GoogleMap>
  );
}
