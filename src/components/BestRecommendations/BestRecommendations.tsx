import React, { useEffect, useRef } from 'react';

import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { useLocalStorage } from '../../hooks/localStorage';

import { PlacesAutocomplete } from '../PlacesAutocomplete/PlacesAutocomplete';

import { ICoordinate } from '../../models/coordinates.model';

import { USER_LOCATION } from '../../constants';

export function BestRecommendations() {
  const {
    farDistance,
    midDistance,
    smallDistance,
  } = useAppSelector((store) => store.userLocations.recommend);

  const [, setLocation] = useLocalStorage<ICoordinate>(USER_LOCATION, {} as ICoordinate);

  const { userLocation } = useAppSelector((store) => store.userLocations);

  const refFar = useRef<HTMLInputElement>(null);
  const refMid = useRef<HTMLInputElement>(null);
  const refSmall = useRef<HTMLInputElement >(null);

  const {
    setSmallCircles, setFarCircles, setMidCircles, setUserLocation,
  } = useActions();

  const setUserPosition = () => {
    // the way you can get user coordinate
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
    );
  };

  useEffect(() => {
    setLocation(userLocation as ICoordinate);
  }, [userLocation]);

  return (
    <div className="text-white text-lg font-semibold flex flex-col gap-4 overflow-hidden overflow-y-scroll p-1.5">
      <div className="flex items-center gap-2">
        <input
          ref={refFar}
          onClick={() => setFarCircles(refFar?.current?.checked as boolean)}
          defaultChecked={farDistance}
          type="checkbox"
          className="border-dark text-[#FF5252] focus:ring-offset-0 focus:ring-transparent rounded w-6 h-6 mr-[5px] cursor-pointer"
        />
        {' '}
        <h5>Far-distance (Truck related)</h5>
      </div>
      <div className="flex items-center gap-2">
        <input
          ref={refMid}
          onClick={() => setMidCircles(refMid?.current?.checked as boolean)}
          defaultChecked={midDistance}
          type="checkbox"
          className="border-dark text-[#FBC02D] focus:ring-offset-0 focus:ring-transparent rounded w-6 h-6 mr-[5px] cursor-pointer"
        />
        {' '}
        <h5>Middle-distance (Van related)</h5>
      </div>
      <div className="flex items-center gap-2">
        <input
          ref={refSmall}
          onClick={() => setSmallCircles(refSmall?.current?.checked as boolean)}
          defaultChecked={smallDistance}
          type="checkbox"
          className="border-dark text-[#8BC34A] focus:ring-offset-0 focus:ring-transparent rounded w-6 h-6 mr-[5px] cursor-pointer"
        />
        {' '}
        <h5>Small-distance (Self related)</h5>
      </div>
      <div>
        <p className="text-sm font-light text-center mb-2">If you want to set your current exact position, press the button bellow</p>
        <button
          onClick={setUserPosition}
          className="sidebar-form__controls-button w-full font-semibold bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg transition-all hover:opacity-90 p-3"
          type="submit"
        >
          Set My Current Position
        </button>
      </div>
      <div className="text-dark text-md">
        <p className="text-white text-sm font-light text-center mb-2">
          If you want to set your approximate position, just start to type on input field
        </p>
        <PlacesAutocomplete placeholder="Write your current approximate location" />
      </div>
    </div>
  );
}
