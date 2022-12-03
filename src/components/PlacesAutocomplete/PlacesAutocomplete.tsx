import React from 'react';

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

export function PlacesAutocomplete({ setService, service, adrs }:
{ setService: Function, service: IService, adrs: string }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    const s = { ...service };
    s.coordinate.latitude = lat;
    s.coordinate.longitude = lng;
    setService(s);
  };

  return (
    <Combobox onSelect={handleSelect} className="mb-2 relative">
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="w-full p-3 border-dark-green rounded-2xl border-2 outline-none "
        placeholder={adrs || 'Enter your service address...'}
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