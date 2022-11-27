import React from 'react';

import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { defaultTheme } from './Theme';

import { useGetAllServicesQuery } from '../../redux/services/services';
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
  const { data: allTrashBins } = useGetAllServicesQuery();

  const { setPopupState, setCurrentService } = useActions();

  const handleClick = (trashBinService: IService) => {
    setPopupState(true);
    setCurrentService(trashBinService);
  };

  const handleOnLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    trashBins.forEach((trashBin: IService) => bounds.extend(
      {
        lat: trashBin.coordinate.longitude,
        lng: trashBin.coordinate.latitude,
      },
    ));
    map.fitBounds(bounds);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={handleOnLoad}
      options={defaultOptions}
    >
      {(allTrashBins || trashBins)?.map((trashBin: IService) => {
        const trashBinCenter = {
          lng: trashBin.coordinate.latitude,
          lat: trashBin.coordinate.longitude,
        };

        return (
          <MarkerF
            icon="/eco-bin.png"
            key={trashBin.id}
            position={trashBinCenter}
            label={{
              text: trashBin.serviceName,
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#023047',
            }}
            onClick={() => handleClick(trashBin)}
          />
        );
      })}
    </GoogleMap>
  );
}
