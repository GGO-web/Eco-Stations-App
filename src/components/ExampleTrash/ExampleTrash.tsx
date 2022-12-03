import React from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAppSelector } from '../../hooks/redux';

import 'react-lazy-load-image-component/src/effects/blur.css';

import { v4 as uuidv4 } from 'uuid';

import { Images } from './Images';

export function ExampleTrash({ waste }: { waste: string }) {
  const { typeOfWastes } = useAppSelector((store) => store.service.service);

  return (
    <div className="absolute top-[5rem] h-32 flex gap-4 bg-main p-2 rounded-2xl w-1/2">
      {waste !== '' && (Images[waste] as string[]).map(
        (image: string) => (
          <LazyLoadImage
            key={uuidv4()}
            height="100%"
            width="100%"
            className="w-full h-full object-cover rounded-2xl object-center"
            src={image}
            effect="blur"
            alt="Trash"
          />
        ),
      ) }
    </div>
  );
}
