import React from 'react';

import { Link } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { waste } from './waste';

import { IType } from '../../models/typesOfWaste.model';

import 'react-lazy-load-image-component/src/effects/blur.css';

export function TypesOfWaste() {
  return (
    <div className="p-4 min-h-screen">
      <div>
        <h2 className="text-4xl text-center mb-4 tracking-wider font-bold text-dark">Types Of Waste</h2>
      </div>

      <div className="grid w-full place-items-center grid-cols-auto-types gap-4 max-[425px]:grid-cols-1">
        {waste.types.map((type: IType) => (
          <Link to={`${type.id}`} key={uuidv4()}>
            <article className="w-full bg-lime-400 rounded-2xl text-center overflow-hidden hover:scale-105 transition relative">
              <LazyLoadImage effect="blur" src={type.image} alt="Trash" />
              <div className="rounded-l-2xl bg-light-green absolute z-10 bottom-0 w-full left-0">
                <h3 className="text-lg font-semibold text-dark">{type.name}</h3>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
