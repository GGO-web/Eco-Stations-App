import React from 'react';

import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';

import './Popup.scss';

export function Popup() {
  const {
    address,
    typeOfWastes,
    deliveryOptions,
    rating,
    priceOfService,
  } = useAppSelector((store) => store.service.service);

  const { setPopupState } = useActions();

  const popupHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains('wrapper-popup')) {
      setPopupState(false);
    }
  };

  return (
    <div onClick={(e) => popupHandleClick(e)} className="wrapper-popup">
      <div className="popup-container">
        <h3 className="text-3xl">Service Info</h3>
        <div>
          <p>
            Address:
            {address}
          </p>
          <p>
            Types of waste:
            {typeOfWastes.map((type: string) => type).join(',')}
          </p>
          <p>
            Delivery options:
            {' '}
            {deliveryOptions.map((option: string) => option).join(',')}
          </p>
        </div>
        <div>
          <p>
            Rating:
            {rating}
          </p>
          <p>
            Price of service:
            {priceOfService}
          </p>
        </div>
      </div>
    </div>
  );
}
