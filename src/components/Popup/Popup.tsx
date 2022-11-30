import React, { useState } from 'react';

import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';

import { StarRating } from './StarRating';
import { AskForm } from '../AskForm/AskForm';

import './Popup.scss';

export function Popup() {
  const {
    address,
    typeOfWastes,
    deliveryOptions,
    rating,
    paymentConditions,
    priceOfService,
  } = useAppSelector((store) => store.service.service);

  const { setPopupState } = useActions();

  const [askQuestionField, setAskQuestionField] = useState<boolean>(false);

  const popupHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains('wrapper-popup')) {
      setPopupState(false);
    }
  };

  return (
    <div onClick={(e) => popupHandleClick(e)} className="wrapper-popup">
      <div className="popup-container">
        <h3 className="text-3xl text-center pb-4">Service Info</h3>
        <div className="max-w-[400px]">
          <div className="flex flex-col flex-auto">
            <p className="py-2">
              Address:
              {' '}
              {address}
            </p>
            <p className="py-2">
              Types of waste:
              {' '}
              {typeOfWastes.join(', ')}
            </p>
            <p className="py-2">
              Delivery options:
              {' '}
              {deliveryOptions.join(',')}
            </p>
          </div>
          <div className="flex flex-col flex-auto">
            <p className="py-2">
              Price of service:
              {' '}
              {priceOfService || 'FREE'}
            </p>
            <p className="py-2">
              Payment Conditions:
              {' '}
              {paymentConditions.join(', ')}
            </p>
            <div className="flex gap-4 items-center py-2">
              Rating:
              {' '}
              <StarRating rate={rating} />
            </div>
          </div>
        </div>
        {!askQuestionField && (
          <>
            <p className="text-center py-4">If you have any questions, feel free to ask 😉</p>
            <button onClick={() => setAskQuestionField(true)} type="button" className="p-3 rounded-2xl bg-[#7483bd] text-white w-full">Ask a Question</button>
          </>
        )}
        {askQuestionField && <AskForm setQuestion={setAskQuestionField} />}
      </div>
    </div>
  );
}