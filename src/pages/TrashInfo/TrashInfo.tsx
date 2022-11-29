import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { waste } from '../TypesOfWaste/waste';

import { ISpecificType, IType } from '../../models/typesOfWaste.model';

import plastics from '../../../public/CardPics/plastics.jpg';

export function TrashInfo() {
  const { id } = useParams();

  const [wasteInfo, setWasteInfo] = useState({
    id: '',
    name: '',
    image: '',
    specificTypes: [],
  } as IType);

  useEffect(() => {
    const info = waste.types?.find((type: IType) => type.id === id);
    setWasteInfo(info as IType);
  }, []);

  return (
    <div>
      <header className="relative w-full h-[300px] max-[500px]:h-[200px]">
        <img className=" h-full  w-full object-cover blur" src={plastics} alt={wasteInfo.id} />
        <h3 className="absolute z-10 top-[50%] left-[50%] text-white text-8xl font-semibold translate-y-[-50%] translate-x-[-50%] bg-black rounded-2xl p-4 max-[500px]:text-4xl">{wasteInfo.name}</h3>
      </header>
      <main className="p-5">
        {wasteInfo.specificTypes.map((specificType: ISpecificType) => (
          <div className="my-4">
            <h5 className="text-2xl font-bold text-center max-[426px]:text-xl">{specificType.fullName}</h5>
            <p className="font-semibold text-center text-[#35374f]">{specificType.shortcut}</p>
            {specificType.disposed && (
            <div className="m-2">
              <h6 className="text-xl font-semibold max-[426px]:text-lg">What can be disposed:</h6>
              {specificType.disposed?.map((disposed) => (
                <p className="text-lg my-3 max-[426px]:text-base">
                  🚮
                  {' '}
                  {disposed}
                </p>
              ))}
            </div>
            )}
            {specificType.notDisposed && (
              <div className="m-2">
                <h6 className="text-xl font-semibold max-[426px]:text-lg">What can NOT be disposed:</h6>
                {specificType.notDisposed?.map((notDisposed) => (
                  <p className="text-lg my-3 max-[426px]:text-base">
                    🚯
                    {' '}
                    {notDisposed}
                  </p>
                ))}
              </div>
            )}
            {specificType.importantly && (
              <div className="m-2">
                <h6 className="text-xl font-semibold max-[426px]:text-lg">Important:</h6>
                {specificType.importantly?.map((importantly) => (
                  <p className="text-lg my-3 max-[426px]:text-base">
                    🗸
                    {' '}
                    {importantly}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
