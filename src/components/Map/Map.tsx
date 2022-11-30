import React, { useEffect, useState } from 'react';

import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { defaultTheme } from './Theme';

import {
  useLazyGetAddressFromCoordinatesQuery,
  useLazyGetServiceByIdQuery,
  useLazyGetServicesFromAnAreaQuery,
} from '../../redux/services/services';
import { useActions } from '../../hooks/actions';

import { ICoordinate } from '../../models/coordinates.model';
import { IService } from '../../models/service.model';

import { trashBins } from '../../constants';
import { IMapOptions } from '../../models/bounds.model';

import { truncateCoordinate } from '../../helpers/truncateCoordinate';
import { useDebounce } from '../../hooks/debounce';
import { IShortService } from '../../models/shortService.model';

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
  const [allTrashBins, setAllTrashBins] = useState<IShortService[]>([]);

  const [mapOptions, setMapOptions] = useState<IMapOptions>(
    {
      center: { lng: 0, lat: 0 },
      southWest: { lng: 0, lat: 0 },
      northEast: { lng: 0, lat: 0 },
    },
  );

  const [getAddress] = useLazyGetAddressFromCoordinatesQuery();
  const [getServicesFromArea] = useLazyGetServicesFromAnAreaQuery();

  const { setPopupState, setCurrentService } = useActions();

  const [mapref, setMapRef] = useState<google.maps.Map | null>(null);

  const debouncedMapOptions = useDebounce(mapOptions, 400);

  const [getServiceById] = useLazyGetServiceByIdQuery();

  useEffect(() => {
    const getServicesInAnArea = async () => {
      // getting eco services in the area
      try {
        const trashBinsInArea: IService[] = await getServicesFromArea({
          blCoordinate: mapOptions.southWest,
          trCoordinate: mapOptions.northEast,
        }).unwrap();

        setAllTrashBins(trashBinsInArea);
      } catch (error: any) {
        setAllTrashBins([]);
      }
    };

    getServicesInAnArea();
  }, [debouncedMapOptions]);

  const handleClick = async (trashBinService: IShortService) => {
    const addressResponse = await getAddress({
      lat: trashBinService.coordinate.latitude,
      lng: trashBinService.coordinate.longitude,
    }).unwrap();

    const serviceResponse = await getServiceById(trashBinService.id as number);

    const currentService: IService = serviceResponse.data as IService;

    setPopupState(true);
    setCurrentService({
      ...currentService,
      address: (addressResponse as any).results[0].formatted_address,
    });
  };

  const handleCenterChanged = async (mapObject: google.maps.Map | null) => {
    if (mapObject) {
      const mapBounds: google.maps.LatLngBounds = (
        await mapObject.getBounds() as google.maps.LatLngBounds
      );

      setMapOptions(
        {
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
        },
      );
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
      onBoundsChanged={() => handleCenterChanged(mapref)}
      options={defaultOptions}
    >
      {(allTrashBins || trashBins)?.map((trashBin: IShortService) => {
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
