import React from 'react';

import { Link } from 'react-router-dom';

export function Error() {
  return (
    <div className="grid place-items-center w-full h-screen p-5 font-bold">
      <div className="flex flex-col items-center text-dark">
        <h3 className="text-[220px] max-[425px]:text-[160px] leading-none">404</h3>
        <p className="text-6xl tracking-widest max-[425px]:text-4xl">THE PAGE</p>
        <p className="text-2xl mt-2">WAS NOT FOUND</p>
        <Link to="/" className="mt-3 bg-light-green  rounded-2xl px-8 py-4">BACK TO HOME</Link>
      </div>
    </div>
  );
}
