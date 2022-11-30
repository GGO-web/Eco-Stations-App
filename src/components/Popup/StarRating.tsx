import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function StarRating({ rate }: { rate: number | undefined }) {
  const [rating, setRating] = useState(rate || 0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={uuidv4()}
            className={index <= (hover || rating) ? 'text-[#9300FE]' : 'text-[#010101]'}
            onClick={() => setRating(index)}
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