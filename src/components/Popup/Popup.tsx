import React, { useEffect, useState } from 'react';

import { v4 as uuidv4, v4 } from 'uuid';
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

interface ITab {
  id: string;
  title: string;
  controls: string;
  classes: string;
  selected: boolean;
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

  const [tabs, setTabs] = useState<ITab[]>([
    {
      id: v4(),
      title: 'Service Info',
      classes: 'popup__tabs-info',
      controls: 'tabpanel-info',
      selected: true,
    },
    {
      id: v4(),
      title: 'Questions',
      classes: 'popup__tabs-questions',
      selected: false,
      controls: 'tabpanel-questions',
    },
  ]);

  const popupHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains('wrapper-popup')) {
      setPopupState(false);
    }
  };

  const handleActiveTab = (id: string) => {
    setTabs((prevTabState) => prevTabState.map((tab: ITab) => (
      { ...tab, selected: tab.id === id }
    )));
  };

  const getTabpanelStatus = (controls: string) => !tabs.find(
    (tab: ITab) => tab.controls === controls,
  )?.selected;

  return (
    <div onClick={(e) => popupHandleClick(e)} className="wrapper-popup">
      {waste && <ExampleTrash waste={waste as any} />}

      <div className="popup popup-container">
        <div className="popup__tabs gap-8 pb-4">
          {tabs.map((tab: ITab) => (
            <button
              type="button"
              role="tab"
              aria-selected={tab.selected}
              aria-controls={tab.controls}
              onClick={() => handleActiveTab(tab.id)}
              className={`${tab.classes} popup__tab text-2xl p-2 text-center`}
            >
              <div className="popup__tab-text">
                <div className="popup__tab-text-block">
                  {[...tab.title].map((letter) => <span className="popup__tab-text-letter">{letter}</span>)}
                </div>
                <div className="popup__tab-text-block">
                  {[...tab.title].map((letter) => <span className="popup__tab-text-letter">{letter}</span>)}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="popup__tabpanels">
          <div id="tabpanel-info" aria-hidden={getTabpanelStatus('tabpanel-info')} role="tabpanel" className="popup__tabpanel popup-info w-[400px] w-md-[300px]">
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
                {textDesc}
              </p>
              )}
              <div className="flex gap-4 items-center py-2">
                Rating:
                {' '}
                {credentials.role === ROLES.User ? <StarRating rate={rating as number} /> : rating}
              </div>
            </div>
          </div>

          <div id="tabpanel-questions" aria-hidden={getTabpanelStatus('tabpanel-questions')} role="tabpanel" className="popup__tabpanel popup-questions w-[400px] w-md-[300px]">
            {!askQuestionField && (
            <>
              <p className="text-center py-4">If you have any questions, feel free to ask 😉</p>
              <button onClick={() => setAskQuestionField(true)} type="button" className="p-3 rounded-2xl bg-[#7483bd] text-white w-full">Ask a Question</button>
            </>
            )}
            {askQuestionField && <AskForm setQuestion={setAskQuestionField} />}
          </div>
        </div>
      </div>
    </div>
  );
}
