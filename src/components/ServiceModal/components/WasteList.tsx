import React, { useEffect, useState } from 'react';

import { IService } from '../../../models/service.model';

import { TypesOfWaste } from '../Options';

export function WasteList({
  service, setService, descArr, setDescArr,
}: { service: IService, setService: Function, descArr: Array<any>, setDescArr: Function }) {
  const TypeOfWasteInitialCheckers = new Array(TypesOfWaste.length).fill(false);

  const [checkedStateWaste, setCheckedStateWaste] = useState(
    service.typeOfWastes.length > 0
      ? TypesOfWaste?.map((type:string, index: number) => (service.typeOfWastes.includes(type)
        ? TypeOfWasteInitialCheckers[index] = true : false))
      : TypeOfWasteInitialCheckers,
  );

  const handleCheckTypes = (e: React.ChangeEvent<HTMLInputElement>, position: number) => {
    const updatedCheckedState = checkedStateWaste
      .map((item, index) => (index === position ? !item : item));

    setCheckedStateWaste(updatedCheckedState);

    let updatedList = [...service.typeOfWastes];

    if (e.target.checked) {
      updatedList = [...service.typeOfWastes, e.target.value];
    } else {
      updatedList.splice(service.typeOfWastes.indexOf(e.target.value), 1);
    }

    setService({ ...service, typeOfWastes: updatedList });
  };

  return (
    <div className="flex gap-4 items-center flex-wrap">
      {TypesOfWaste.map((type, index) => {
        const [priceOfWaste, setPriceOfWaste] = useState(descArr[1] || {});

        // console.log(service);

        useEffect(() => {
          setDescArr((prevState: string[]) => {
            prevState[1] = priceOfWaste;

            return prevState;
          });

          const descriptionChanged = `[${
            JSON.stringify(descArr[0])
          },${
            JSON.stringify(priceOfWaste)
          }, ${
            JSON.stringify(descArr[2])
          }]`;

          setService({ ...service, description: descriptionChanged });
        }, [priceOfWaste]);

        return (
          <div className={`flex items-center gap-1 ${checkedStateWaste[index] && 'w-full'}`} key={type}>
            <input
              value={type}
              type="checkbox"
              onChange={(e) => handleCheckTypes(e, index)}
              checked={checkedStateWaste[index]}
              id="types"
              className="input-checkbox cursor-pointer accent-dark-green"
              style={{ accentColor: '#379683' }}
            />

            <span>{type}</span>

            {checkedStateWaste[index] && (
            <input
              value={priceOfWaste[type as never]}
              onChange={(e) => {
                setPriceOfWaste({ ...priceOfWaste, [type]: e.target.value });
              }}
              className="grow p-3 border-dark-green rounded-2xl border-2 outline-none"
              type="text"
              placeholder="Write down price here. It should be like: 0.01 EUR/kg"
            />
            )}
          </div>
        );
      })}
    </div>
  );
}
