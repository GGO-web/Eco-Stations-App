import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';

import { useUpdateServiceRatingMutation } from '../../../../redux/services/services';
import { useAppSelector } from '../../../../hooks/redux';

import { IService } from '../../../../models/service.model';
import { useActions } from '../../../../hooks/actions';

export function StarRating({ rate }: { rate: number | undefined }) {
  const [rating, setRating] = useState(rate || 0);
  const [hover, setHover] = useState(0);

  const [updateRating] = useUpdateServiceRatingMutation();
  const currentService: IService = useAppSelector((store) => store.service.service);

  const { trashBins } = useAppSelector((store) => store.trashBins);
  const { setAllTrashBins } = useActions();

  const updateRatingHandler = (ratingValue: number) => {
    setRating(ratingValue);

    setAllTrashBins(trashBins.map((trashBin: IService) => (trashBin.id === currentService.id
      ? {
        ...trashBin,
        rating: ratingValue,
      }
      : trashBin)));

    updateRating({ id: currentService.id as number, rating: ratingValue });

    toast.success('Thank you for feedback 😶‍🌫️', {
      toastId: 'rating',
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={uuidv4()}
            className={`inline-flex items-center justify-center w-[30px] h-[30px] ${
              index <= (hover || rating)
                ? 'text-[#9300FE]'
                : 'text-[#010101]'
            }`}
            onClick={() => updateRatingHandler(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="text-4xl">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}
