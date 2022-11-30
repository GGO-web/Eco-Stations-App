import React, { useState } from 'react';

import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { defaultTheme } from './Theme';

import {
  // useGetAllServicesQuery,
  useLazyGetAddressFromCoordinatesQuery,
  useLazyGetServicesFromAnAreaQuery,
} from '../../redux/services/services';
import { useActions } from '../../hooks/actions';

import { ICoordinate } from '../../models/coordinates.model';
import { IService } from '../../models/service.model';

import { trashBins } from '../../constants';
import { IMapOptions } from '../../models/bounds.model';
import { getDistanceFromCoordinates } from '../../helpers/getDistanceFromCoordinates';
import { truncateCoordinate } from '../../helpers/truncateCoordinate';

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

export function Map({ center }: { center: ICoordinate }) {
  // const { data: allEcoServices } = useGetAllServicesQuery();
  const [allTrashBins, setAllTrashBins] = useState<IService[]>([]);

  const [getAddress] = useLazyGetAddressFromCoordinatesQuery();
  const [getSevicesFromArea] = useLazyGetServicesFromAnAreaQuery();

  const { setPopupState, setCurrentService } = useActions();

  const [mapref, setMapRef] = useState<google.maps.Map | null>(null);

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

  const handleCenterChanged = async (mapObject: google.maps.Map | null) => {
    if (mapObject) {
      const mapBounds: google.maps.LatLngBounds = (
        await mapObject.getBounds() as google.maps.LatLngBounds
      );

      const mapOptions: IMapOptions = {
        center: {
          lat: truncateCoordinate(mapBounds.getCenter().lat()),
          lng: truncateCoordinate(mapBounds.getCenter().lng()),
        },
        southWest: {
          lat: truncateCoordinate(mapBounds.getSouthWest().lat()),
          lng: truncateCoordinate(mapBounds.getSouthWest().lng()),
        },
        northEast: {
          lat: truncateCoordinate(mapBounds.getNorthEast().lat()),
          lng: truncateCoordinate(mapBounds.getNorthEast().lng()),
        },
      };

      const middleEdgeCoordinate: ICoordinate = {
        lat: mapOptions.center.lat,
        lng: mapOptions.northEast.lng,
      };

      const distance = getDistanceFromCoordinates(
        mapOptions.center,
        middleEdgeCoordinate,
      );

      // getting eco services in the area
      try {
        const trashBinsInArea: IService[] = await getSevicesFromArea({
          latitude: mapOptions.center.lat,
          longitude: mapOptions.center.lng,
          distance,
        }).unwrap();

        setAllTrashBins(trashBinsInArea);
      } catch (error) {
        setAllTrashBins([]);
      }
    }
  };

  const handleOnLoad = (map: google.maps.Map) => {
    setMapRef(map);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={handleOnLoad}
      onZoomChanged={() => handleCenterChanged(mapref)}
      onBoundsChanged={() => handleCenterChanged(mapref)}
      onDragEnd={() => handleCenterChanged(mapref)}
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
