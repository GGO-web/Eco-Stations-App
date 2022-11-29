import React from 'react';

import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { defaultTheme } from './Theme';

import { useGetAllServicesQuery, useLazyGetAddressFromCoordinatesQuery } from '../../redux/services/services';
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

  const [getAddress] = useLazyGetAddressFromCoordinatesQuery();

  const { setPopupState, setCurrentService } = useActions();

  const handleClick = async (trashBinService: IService) => {
    const response = await getAddress({
      lat: trashBinService.coordinate.latitude,
      lng: trashBinService.coordinate.longitude,
    }).unwrap();

    setPopupState(true);
    setCurrentService({
      ...trashBinService,
      address: (response as any).results[0].formatted_address,
    });
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={defaultOptions}
    >
      {(allTrashBins || trashBins)?.map((trashBin: IService) => {
        const trashBinCenter = {
          lng: trashBin.coordinate.longitude,
          lat: trashBin.coordinate.latitude,
        };

        return (
          <MarkerF
            icon="/eco-bin.png"
            key={trashBin.id}
            position={trashBinCenter}
            label={{
              text: trashBin.serviceName,
              className: 'absolute left-0 top-[-5px]',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
            onClick={() => handleClick(trashBin)}
          />
        );
      })}
    </GoogleMap>
  );
}
