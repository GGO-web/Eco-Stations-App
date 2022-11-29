import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Link } from 'react-router-dom';
import { waste } from './waste';

import { IType } from '../../models/typesOfWaste.model';

export function TypesOfWaste() {
  return (
    <div className="p-4 bg-lime-400">
      <div>
        <h2 className="text-3xl text-center">Types Of Waste</h2>
      </div>
      <div className="grid w-full place-items-center grid-cols-auto-types gap-4">
        {waste.types.map((type: IType) => (
          <Link to={`${type.id}`} key={uuidv4()}>
            <article className="w-full bg-lime-400 rounded-2xl text-center overflow-hidden hover:scale-105 transition relative">
              <img src={type.image} alt="Trash" />
              <div className="rounded-l-2xl bg-white absolute z-10 bottom-0 w-full left-0">
                <h3>{type.name}</h3>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
