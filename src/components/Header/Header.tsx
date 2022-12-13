import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';

import { useActions } from '../../hooks/actions';
import { useCredentials } from '../../hooks/credentials';

import './Header.scss';

export function Header() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { role, isAuth } = useAppSelector((store) => store.auth);

  const { logOut, setLogOutFilter, setLogoutRecommend } = useActions();
  const [, setCredentialsStore] = useCredentials();

  return (
    <header
      style={{
        background: '#8EE4AF',
        color: '#05386B',
        display: 'flex',
        maxHeight: '70px',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <NavLink className="h-[70px]" to="/">
        <picture>
          <source srcSet="ecofinder-mobile.svg" media="(max-width: 600px)" />
          <img src="ecofinder.svg" alt="Logo" className="h-full object-cover object-center w-[300px] max-[600px]:w-[70px]" />
        </picture>
      </NavLink>

      <div className={`header-menu flex items-center gap-2 pl-3 pr-3 max-[425px]:gap-1 ${!isAuth && 'max-[425px]:px-1'}`}>
        <div className="flex gap-4 items-center max-[425px]:gap-2">
          <NavLink className="text-xl font-bold py-2 px-2 hover:bg-dark hover:text-light-green transition rounded-xl max-[520px]:text-base max-[425px]:text-sm max-[425px]:w-fit max-[325px]:mx-[-10px]" to="/detailed">Waste Types</NavLink>

          {role === 'Service' && (
            <NavLink className=" hover:bg-dark hover:text-light-green transition rounded-xl text-xl font-bold py-2 px-2 max-[520px]:text-base max-[425px]:text-sm" to="/services">Services</NavLink>
          )}

          {!isAuth ? (
            <button
              type="button"
              className="rounded-full hover:bg-light transition"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <svg className="p-[2px]" focusable="false" aria-hidden="true" width="30" height="30" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setCredentialsStore({});
                logOut();
                setLogoutRecommend();
                setLogOutFilter();
              }}
            >
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"
                />
              </svg>
            </button>
          )}
        </div>

        {!isAuth && (
          <div
            data-open={userMenuOpen}
            className="header-menu__account flex gap-3 items-center max-[425px]:gap-2"
          >
            <NavLink className="text-sm shrink-0 text-center font-bold py-1 px-3 hover:bg-dark hover:text-light-green transition rounded-xl max-[425px]:px-2" to="/Login">
              Sign in
            </NavLink>

            <NavLink className="text-sm font-bold py-1 px-3 hover:bg-dark hover:text-light-green transition rounded-xl max-[425px]:px-2" to="/Auth">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
