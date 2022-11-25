import React, { useRef } from 'react';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { defaultTheme } from './Theme';

import { trashBins } from '../../constants';

import { useActions } from '../../hooks/actions';
import { ICoordinate } from '../../models/coordinates.model';
import { IService } from '../../models/service.model';

const containerStyle = {
  width: '100%',
  height: '100%',
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

export function Map({ center }: { center: ICoordinate }) {
  const mapRef = useRef<any>(null);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const { setPopupState, setCurrentService } = useActions();

  const handleClick = (trashBinService: IService) => {
    setPopupState(true);
    setCurrentService(trashBinService);
  };

  return (
    <div style={{ width: '90%', height: '90vh' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        options={defaultOptions}
      >
        {trashBins.map((trashBin: IService) => {
          const trashBinCenter = {
            lng: trashBin.coordinate.latitude,
            lat: trashBin.coordinate.longitude,
          };

          return (
            <Marker
              key={trashBin.id}
              position={trashBinCenter}
              label={{
                text: trashBin.serviceName,
                fontSize: '22px',
                fontWeight: 'bold',
              }}
              onClick={() => handleClick(trashBin)}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
}
