import React, {
  FormEvent, useEffect, useRef, useState,
} from 'react';
import { v4 } from 'uuid';

import { BestRecommendations } from '../BestRecommendations/BestRecommendations';

import { useMediaCondition } from '../../hooks/mediaCondition';
import { useActions } from '../../hooks/actions';

import { DELIVERY_OPTIONS, PAYMENT_CONDITIONS, WASTE_TYPES } from '../../constants';

import { IServiceFilter } from '../../models/serviceFilter.model';

import rightArrow from '../../assets/right-arrow.svg';
import './Sidebar.scss';

export function Sidebar() {
  const filterForm = useRef<HTMLFormElement>(null);

  const windowMediaStatus = useMediaCondition('(min-width: 768px)');

  const [sidebarIsOpened, setSidebarIsOpened] = useState<boolean>(windowMediaStatus);
  const [bestRecIsOpened, setBestRecIsOpened] = useState<boolean>(false);
  const [filterServicesIsOpened, setFilterServicesIsOpened] = useState<boolean>(false);

  const { setTrashBinsFilter } = useActions();

  const setCheckState = (checked: boolean, revert: boolean = false) => {
    const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input-checkbox');

    checkboxes.forEach((checkbox: HTMLInputElement) => {
      if (revert) {
        checkbox.checked = !checkbox.checked;
      } else {
        checkbox.checked = checked;
      }
    });
  };

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    const deliveryCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input-checkbox[name=delivery]');
    const paymentCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input-checkbox[name=payment]');
    const wasteTypeCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input-checkbox[name=waste-type]');

    const filterObject: IServiceFilter = {
      deliveryOptions: [],
      paymentConditions: [],
      typeOfWastes: [],
    };

    deliveryCheckboxes.forEach((deliveryCheckbox: HTMLInputElement) => {
      if (deliveryCheckbox.checked) {
        filterObject.deliveryOptions.push(deliveryCheckbox.value);
      }
    });

    paymentCheckboxes.forEach((paymentCheckbox: HTMLInputElement) => {
      if (paymentCheckbox.checked) {
        filterObject.paymentConditions.push(paymentCheckbox.value);
      }
    });

    wasteTypeCheckboxes.forEach((wasteTypeCheckbox: HTMLInputElement) => {
      if (wasteTypeCheckbox.checked) {
        filterObject.typeOfWastes.push(wasteTypeCheckbox.value);
      }
    });

    setTrashBinsFilter(filterObject);
  };

  const toggleFilterMenu = () => {
    setSidebarIsOpened((prevSidebarOpenState) => !prevSidebarOpenState);
    setBestRecIsOpened(false);
    setFilterServicesIsOpened(false);
  };

  useEffect(() => {
    setSidebarIsOpened(windowMediaStatus);

    if (windowMediaStatus === false) {
      setBestRecIsOpened(false);
      setFilterServicesIsOpened(false);
    }
  }, [windowMediaStatus]);

  return (
    <aside className="sidebar py-5 px-3 bg-gradient-to-br from-light-green via-light-green to-blue-500" data-open={sidebarIsOpened}>
      <header className="sidebar-form__header flex items-center gap-3 mb-5 p-1">
        <button type="button" className="sidebar-form__toggler" onClick={() => toggleFilterMenu()}>
          <svg width="30" className="fill-dark" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 377 377" xmlSpace="preserve">
            <g>
              <rect x="75" y="73.5" width="302" height="30" />
              <rect y="73.5" width="30" height="30" />
              <rect y="273.5" width="30" height="30" />
              <rect x="75" y="273.5" width="302" height="30" />
              <rect y="173.5" width="30" height="30" />
              <rect x="75" y="173.5" width="302" height="30" />
            </g>
          </svg>
        </button>

        <h2 className="text-3xl font-semibold leading-none text-white">Feature Sidebar</h2>
      </header>

      <div
        className={`flex items-center gap-3 p-1 text-white text-xl min-h-[50px] rounded-2xl hover:bg-white hover:bg-opacity-10 transition cursor-pointer ${!sidebarIsOpened && 'pointer-events-none'}`}
        onClick={() => {
          setFilterServicesIsOpened(false);
          setBestRecIsOpened((prevState) => !prevState);
        }}
      >
        <img src={rightArrow} alt="arrow" className={`rounded-full transition-all ${bestRecIsOpened && 'rotate-90'} right-arrow`} />
        <h6>Best Recommendations</h6>
      </div>

      {bestRecIsOpened && <BestRecommendations />}

      <div
        className={`flex items-center gap-3 p-1 text-white text-xl min-h-[50px] rounded-2xl hover:bg-white hover:bg-opacity-10 transition cursor-pointer ${!sidebarIsOpened && 'pointer-events-none'}`}
        onClick={() => {
          setBestRecIsOpened(false);
          setFilterServicesIsOpened((prevState) => !prevState);
        }}
      >
        <img src={rightArrow} alt="arrow" className={`rounded-full transition-all ${filterServicesIsOpened && 'rotate-90'} right-arrow`} />
        <h6>Filter services</h6>
      </div>

      {filterServicesIsOpened && (
      <form ref={filterForm} onSubmit={(e) => formSubmitHandler(e)} className="sidebar__form p-1.5 gap-y-[10px] sidebar-form text-white" action="">
        <div className="flex gap-3 sidebar-form__controls">
          <button type="button" className="sidebar-form__controls-button font-semibold bg-purple rounded-lg py-1 px-2" onClick={() => setCheckState(true)}>
            Check
          </button>

          <button type="button" className="sidebar-form__controls-button font-semibold bg-light-red rounded-lg py-1 px-2" onClick={() => setCheckState(false)}>
            Uncheck
          </button>

          <button type="button" className="ml-auto sidebar-form__controls-button font-semibold bg-dark rounded-lg py-1 px-2" onClick={() => setCheckState(false, true)}>
            Revert
          </button>
        </div>

        <div className="sidebar-form__filters overflow-auto">
          <div className="sidebar-form__group">
            <h3 className="sidebar-form__group-title text-xl mb-1">
              Delivery options:
            </h3>

            <ul className="sidebar-form__options">
              {DELIVERY_OPTIONS.map((deliveryOption) => (
                <li key={v4()} className="sidebar-form__option">
                  <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                    <input value={deliveryOption} className="input-checkbox cursor-pointer" name="delivery" type="checkbox" />
                    <span className="input-label uppercase transition-all text-lg">{deliveryOption}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-form__group">
            <h3 className="sidebar-form__group-title text-xl mb-1">
              Payment conditions:
            </h3>

            <ul className="sidebar-form__options">
              {PAYMENT_CONDITIONS.map((paymentOption) => (
                <li key={v4()} className="sidebar-form__option ">
                  <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                    <input value={paymentOption} className="input-checkbox cursor-pointer" name="payment" type="checkbox" />
                    <span className="input-label uppercase transition-all text-lg">{paymentOption}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-form__group">
            <h3 className="sidebar-form__group-title text-xl mb-1">
              Waste types:
            </h3>

            <ul className="sidebar-form__options">
              {WASTE_TYPES.map((wasteType) => (
                <li key={v4()} className="sidebar-form__option">
                  <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                    <input value={wasteType} className="input-checkbox cursor-pointer" name="waste-type" type="checkbox" />
                    <span className="input-label uppercase transition-all text-lg">{wasteType}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className="sidebar-form__controls-button font-semibold bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg transition-all hover:opacity-90 p-3" type="submit">
          Apply Filters
        </button>
      </form>
      )}
    </aside>
  );
}
