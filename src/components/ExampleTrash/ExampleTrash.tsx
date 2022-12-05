import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

import { ImagesPreview, ImagesType } from './Images';

export function ExampleTrash({ waste }: { waste: ImagesType }) {
  return (
    <div className="absolute top-[5rem] h-32 flex gap-4 bg-main p-2 rounded-2xl w-1/2">
      {(ImagesPreview[waste] as string[]).map(
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
