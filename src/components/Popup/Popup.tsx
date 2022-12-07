import React, { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';

import { StarRating } from './StarRating';
import { AskForm } from '../AskForm/AskForm';
import { ExampleTrash } from '../ExampleTrash/ExampleTrash';
import { useCredentials } from '../../hooks/credentials';

import './Popup.scss';

import { ImagesType } from '../ExampleTrash/Images';

import { ROLES } from '../../constants';

interface IDescArr {
  type: string;
  price: string;
}

export function Popup() {
  const {
    address,
    typeOfWastes,
    deliveryOptions,
    rating,
    paymentConditions,
    description,
  } = useAppSelector((store) => store.service.service);

  const [textDesc, setText] = useState('');
  const [priceOfDelivery, setDelivery] = useState({});
  const [priceOfWaste, setPricing] = useState({});

  useEffect(() => {
    if (description) {
      const [text, delivery, pricing] = JSON.parse(description as string);
      setText(text);
      setDelivery(delivery);
      setPricing(pricing);
    }
  }, []);

  const getValuesFromObject = (obj: any) => {
    const objKeys = Object.keys(obj);
    const objVal = Object.values(obj);

    return objKeys.map((key, index) => ({ type: key, price: objVal[index] as string }));
  };

  const [waste, setWaste] = useState<ImagesType | null>(null);

  const { setPopupState } = useActions();

  const [askQuestionField, setAskQuestionField] = useState<boolean>(false);

  const [credentials] = useCredentials();

  const popupHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains('wrapper-popup')) {
      setPopupState(false);
    }
  };

  return (
    <div onClick={(e) => popupHandleClick(e)} className="wrapper-popup">
      {waste && <ExampleTrash waste={waste as any} />}
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
              {typeOfWastes.map((type, index) => (
                <span
                  onMouseEnter={() => setWaste(type as ImagesType)}
                  onMouseLeave={() => setWaste(null)}
                  key={uuidv4()}
                  className="cursor-pointer"
                >
                  {type}
                  {index + 1 !== typeOfWastes.length && ', '}
                  {' '}
                </span>
              ))}
            </p>
            {JSON.stringify(priceOfWaste) !== '{}' && (
              <p className="py-2">
                Price for waste:
                {' '}
                <ul className="list-disc pl-7">
                  {priceOfWaste
                    && getValuesFromObject(priceOfWaste)
                      .map((priceWaste: IDescArr) => (
                        <li key={uuidv4()}>
                          {priceWaste.type}
                          {' '}
                          ➡
                          {' '}
                          {priceWaste.price.toUpperCase()}
                        </li>
                      ))}
                </ul>

              </p>
            )}
            <p className="py-2">
              Delivery options:
              {' '}
              {deliveryOptions.map((option, index) => (
                <span key={uuidv4()}>
                  {option}
                  {index + 1 !== deliveryOptions.length && ', '}
                  {' '}
                </span>
              ))}
            </p>
          </div>
          <div className="flex flex-col flex-auto">
            {JSON.stringify(priceOfDelivery) === '{}' ? (
              <div className="py-2">
                Price of service:
                <ul className="list-disc pl-7">
                  <li>SELF ➡ FREE</li>
                </ul>
              </div>
            ) : (
              <div className="py-2">
                Price of service:
                {' '}
                <ul className="list-disc pl-7">
                  <li>SELF ➡ FREE</li>
                  {priceOfDelivery
                    && getValuesFromObject(priceOfDelivery)
                      .map((priceDelivery: IDescArr) => (
                        <li key={uuidv4()}>
                          {priceDelivery.type}
                          {' '}
                          ➡
                          {' '}
                          {priceDelivery.price.toUpperCase()}
                        </li>
                      ))}
                </ul>
              </div>
            )}
            {!(paymentConditions.length === 1 && paymentConditions.includes('FREE')) && (
              <p className="py-2">
                Payment Conditions:
                {' '}
                {paymentConditions.map((pay, index) => (
                  <span key={uuidv4()}>
                    {pay}
                    {index + 1 !== paymentConditions.length && ', '}
                    {' '}
                  </span>
                ))}
              </p>
            )}
            {description && (
            <p>
              Description:
              {' '}
              {/* {textDesc} */}
            </p>
            )}
            <div className="flex gap-4 items-center py-2">
              Rating:
              {' '}
              {credentials.role === ROLES.User ? <StarRating rate={rating as number} /> : rating}
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
