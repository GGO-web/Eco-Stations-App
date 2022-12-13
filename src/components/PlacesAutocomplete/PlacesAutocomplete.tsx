import React, { useEffect } from 'react';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

import { IService } from '../../models/service.model';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';

export function PlacesAutocomplete({ setService, service, placeholder }:
{ setService?: Function, service?: IService, placeholder?: string }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const { setUserLocation } = useActions();

  const currentService = useAppSelector((store) => store.service.service);

  const { userLocation } = useAppSelector((store) => store.userLocations);

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);

    if (service && setService) {
      const s: IService = {
        ...service,
        address,
        coordinate: {
          latitude: lat,
          longitude: lng,
        },
      };

      setService(s as IService);
    }

    setUserLocation({ lat, lng });
  };

  useEffect(() => {
    if (service && setService) {
      const s: IService = {
        ...service,
        address: value,
        coordinate: {
          latitude: userLocation?.lat as number,
          longitude: userLocation?.lat as number,
        },
      };

      setService(s as IService);
    }
  }, [value]);

  useEffect(() => {
    setValue(currentService?.address as string);
  }, []);

  return (
    <Combobox onSelect={handleSelect} className="mb-2 relative">
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className={`w-full p-3 border-dark-green rounded-2xl border-2 outline-none
        ${placeholder && 'text-md placeholder:text-sm'}`}
        placeholder={placeholder || 'Enter your service address...'}
      />
      <ComboboxPopover className="absolute z-[1000000] top-0 rounded-2xl overflow-hidden ">
        <ComboboxList>
          {status === 'OK'
            && data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
