import React, { useRef } from 'react';

import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { PlacesAutocomplete } from '../PlacesAutocomplete/PlacesAutocomplete';

function BestRecommendations() {
  const {
    farDistance,
    midDistance,
    smallDistance,
  } = useAppSelector((store) => store.userLocations.recommend);

  const refFar = useRef(null);
  const refMid = useRef(null);
  const refSmall = useRef(null);

  const { setSmallCircles, setFarCircles, setMidCircles } = useActions();

  return (
    <div className="text-white text-lg font-semibold flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input
          ref={refFar}
          onClick={() => setFarCircles(refFar?.current?.checked)}
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
          onClick={() => setMidCircles(refMid?.current?.checked)}
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
          onClick={() => setSmallCircles(refSmall?.current?.checked)}
          defaultChecked={smallDistance}
          type="checkbox"
          className="border-dark text-[#8BC34A] focus:ring-offset-0 focus:ring-transparent rounded w-6 h-6 mr-[5px] cursor-pointer"
        />
        {' '}
        <h5>Small-distance (Self related)</h5>
      </div>
      <div className="text-dark text-md">
        <PlacesAutocomplete />
      </div>
    </div>
  );
}

export default BestRecommendations;
