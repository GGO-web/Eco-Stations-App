import React, { useEffect, useState } from 'react';

import { IService } from '../../../models/service.model';

import { DeliveryOptions } from '../Options';

export function DeliveryList({
  service, setService, descArr, setDescArr,
}: { service: IService, setService: Function, descArr: Array<any>, setDescArr: Function }) {
  const DeliveryOptionsInitialCheckers = new Array(DeliveryOptions.length).fill(false);

  const [checkedStateDelivery, setCheckedStateDelivery] = useState(
    service.deliveryOptions.length > 0
      ? DeliveryOptions
        ?.map((option: string, index: number) => (service.deliveryOptions.includes(option)
          ? DeliveryOptionsInitialCheckers[index] = true : false))
      : DeliveryOptionsInitialCheckers,
  );

  const handleCheckOptions = (e: React.ChangeEvent<HTMLInputElement>, position: number) => {
    const updatedCheckedState = checkedStateDelivery
      .map((item, index) => (index === position ? !item : item));

    setCheckedStateDelivery(updatedCheckedState);

    let updatedList = [...service.deliveryOptions];
    if (e.target.checked) {
      updatedList = [...service.deliveryOptions, e.target.value];
    } else {
      updatedList.splice(service.deliveryOptions.indexOf(e.target.value), 1);
    }

    setService((prevState: IService) => ({ ...prevState, deliveryOptions: updatedList }));
  };

  return (
    <div className="flex gap-4 items-center flex-wrap">
      {DeliveryOptions.map((delivery, index) => {
        const [priceOfDelivery, setPriceOfDelivery] = useState(descArr[2] || {});

        useEffect(() => {
          setDescArr((prevState: string[]) => {
            prevState[2] = priceOfDelivery;

            return prevState;
          });
        }, [priceOfDelivery]);

        useEffect(() => {
          setPriceOfDelivery(descArr[2] || {});
        }, [descArr[2]]);

        return (
          <div className={`flex items-center gap-1 ${checkedStateDelivery[index] && 'w-full'}`} key={delivery}>
            <input
              value={delivery}
              type="checkbox"
              onChange={(e) => handleCheckOptions(e, index)}
              checked={checkedStateDelivery[index]}
              id="delivery"
              className="input-checkbox cursor-pointer accent-dark-green"
            />

            <span>{delivery}</span>

            {checkedStateDelivery[index] && (
            <input
              value={priceOfDelivery[delivery as never]}
              onChange={(e) => {
                setPriceOfDelivery(
                  (prevState: any) => ({ ...prevState, [delivery]: e.target.value }),
                );
              }}
              className="grow p-3 border-dark-green rounded-2xl border-2 outline-none"
              type="text"
              placeholder="Write down price here. It should be like: 1 EUR/ 20kg"
            />
            )}
          </div>
        );
      })}
    </div>
  );
}
