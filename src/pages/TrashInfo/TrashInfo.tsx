import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { v4 as uuidv4 } from 'uuid';

import { waste } from '../TypesOfWaste/waste';

import { ISpecificType, IType } from '../../models/typesOfWaste.model';

import 'swiper/css';

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
        <img className=" h-full  w-full object-cover blur" src={wasteInfo.image} alt={wasteInfo.id} />
        <h3 className="absolute z-10 top-[50%] left-[50%] text-white text-8xl font-semibold translate-y-[-50%] translate-x-[-50%] bg-black rounded-2xl p-4 max-[500px]:text-4xl text-center">{wasteInfo.name}</h3>
      </header>
      <main className="p-5">
        {wasteInfo.specificTypes.map((specificType: ISpecificType) => (
          <div key={uuidv4()} className="my-4 text-dark">
            <h5 className="text-2xl font-bold text-dark text-center max-[426px]:text-xl">{specificType.fullName}</h5>
            <p className="font-semibold text-center text-[#35374f]">{specificType.shortcut}</p>
            <div className="m-2">
              <Swiper
                breakpoints={{
                  425: {
                    width: 425,
                    slidesPerView: 2,
                  },
                  768: {
                    width: 768,
                    slidesPerView: 3,
                  },
                  1024: {
                    width: 1024,
                    slidesPerView: 4,
                  },
                  1440: {
                    width: 1440,
                    slidesPerView: 5,
                  },
                  2560: {
                    width: 2560,
                    slidesPerView: 5,
                  },
                }}
                spaceBetween={50}
                loop
                className="w-full h-[50vh]"
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
              >
                {specificType.images && specificType.images?.map((image) => (
                  <SwiperSlide key={uuidv4()}>
                    <LazyLoadImage height="100%" width="100%" className="w-full h-full object-cover rounded-2xl object-center" effect="blur" src={image} alt={wasteInfo.id} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {specificType.disposed && (
            <div className="m-2">
              <h6 className="text-xl font-semibold max-[426px]:text-lg">What can be disposed:</h6>
              {specificType.disposed?.map((disposed) => (
                <p key={uuidv4()} className="text-lg my-3 max-[426px]:text-base">
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
                  <p key={uuidv4()} className="text-lg my-3 max-[426px]:text-base">
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
                  <p key={uuidv4()} className="text-lg my-3 max-[426px]:text-base">
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
