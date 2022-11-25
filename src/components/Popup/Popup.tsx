import React from 'react';

import { useSelector } from 'react-redux';

import { useActions } from '../../hooks/actions';

import './Popup.scss';

function Popup() {
  const {
    address,
    typesOfWaste,
    deliveryOptions,
    rating,
    priceOfService,
  } = useSelector((store) => store.service.service);

  const { setPopupState } = useActions();

  const popupHandleClick = (e) => {
    if (e.target.classList.contains('wrapper-popup')) {
      setPopupState(false);
    }
  };

  return (
    <div onClick={popupHandleClick} className="wrapper-popup">
      <div className="popup-container">
        <h3 className="text-3xl">Service Info</h3>
        <div>
          <p>
            Address:
            {address}
          </p>
          <p>
            Types of waste:
            {typesOfWaste.map((type) => type).join(',')}
          </p>
          <p>
            Delivery options:
            {' '}
            {deliveryOptions.map((option) => option).join(',')}
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

export default Popup;
