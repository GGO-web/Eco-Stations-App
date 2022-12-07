import React, { useEffect, useState } from 'react';

import { GoogleMap, MarkerF } from '@react-google-maps/api';

import {
  useFilterServiceInAreaMutation,
  useLazyGetServiceByIdQuery,
} from '../../redux/services/services';

import { truncateCoordinate } from '../../helpers/truncateCoordinate';

import { mapDefaultOptions } from '../../constants';

import { ICoordinate } from '../../models/coordinates.model';
import { IService } from '../../models/service.model';
import { IMapOptions } from '../../models/bounds.model';
import { IShortService } from '../../models/shortService.model';

import { useActions } from '../../hooks/actions';
import { useDebounce } from '../../hooks/debounce';
import { useAppSelector } from '../../hooks/redux';

import { Popup } from '../Popup/Popup';
import { useLazyGetAddressFromCoordinatesQuery } from '../../redux/services/maps';

export function Map({
  mapRef,
  setMapRef,
  center,
}: {
  mapRef: google.maps.Map | null,
  setMapRef: Function,
  center: ICoordinate
}) {
  const { trashBins } = useAppSelector((store) => store.trashBins);

  const [mapOptions, setMapOptions] = useState<IMapOptions>(
    {
      center: { lng: 0, lat: 0 },
      southWest: { lng: 0, lat: 0 },
      northEast: { lng: 0, lat: 0 },
    },
  );

  const [getAddress] = useLazyGetAddressFromCoordinatesQuery();
  const [filterServicesInArea] = useFilterServiceInAreaMutation();

  const trashBinsFilter = useAppSelector((store) => store.trashBins.filter);

  const { setPopupState, setCurrentService, setAllTrashBins } = useActions();

  const debouncedMapOptions = useDebounce(mapOptions, 400);

  const [getServiceById] = useLazyGetServiceByIdQuery();

  useEffect(() => {
    const getServicesInAnArea = async () => {
      // getting eco services in the area
      try {
        const trashBinsInArea: IService[] = await filterServicesInArea({
          blCoordinate: mapOptions.southWest,
          trCoordinate: mapOptions.northEast,
          serviceFilter: trashBinsFilter,
        }).unwrap();

        setAllTrashBins(trashBinsInArea);
      } catch (error: any) {
        setAllTrashBins([]);
      }
    };

    getServicesInAnArea();
  }, [debouncedMapOptions, trashBinsFilter]);

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

  const popUp = useAppSelector((store) => store.service.isPopupOpen);

  return (
    <>
      {popUp && <Popup />}

      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        mapContainerClassName="flex-1 border-t-2 border-r-2 border-r-blue-500 border-t-blue-500"
        center={center}
        zoom={12}
        onLoad={handleOnLoad}
        onBoundsChanged={() => handleCenterChanged(mapRef)}
        options={mapDefaultOptions}
      >
        {trashBins?.map((trashBin: IShortService) => {
          const trashBinCenter = {
            lng: trashBin.coordinate.longitude,
            lat: trashBin.coordinate.latitude,
          };

          return (
            <MarkerF
              icon="eco-bin.png"
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
    </>
  );
}
