import React, { useRef } from 'react';

export function Sidebar() {
  const filterForm = useRef<HTMLFormElement>(null);

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

  const formSubmitHandler = () => {
  };

  return (
    <aside className="sidebar p-5 bg-gradient-to-br from-light-green via-light-green to-blue-500 overflow-hidden">
      <form ref={filterForm} onSubmit={() => formSubmitHandler()} className="sidebar__form grid gap-y-[10px] sidebar-form text-white" action="">
        <legend className="text-3xl font-semibold mb-5">Filter services</legend>

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

        <div className="sidebar-form__filters max-h-[400px] overflow-auto">
          <div className="sidebar-form__group">
            <h3 className="sidebar-form__group-title text-xl mb-1">
              Delivery options:
            </h3>

            <ul className="sidebar-form__options">
              <li className="sidebar-form__option">
                <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                  <input className="input-checkbox cursor-pointer" name="delivery" type="checkbox" />
                  <span className="input-label uppercase transition-all text-lg">self</span>
                </label>
              </li>

              <li className="sidebar-form__option">
                <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                  <input className="input-checkbox cursor-pointer" name="delivery" type="checkbox" />
                  <span className="input-label uppercase transition-all text-lg">van</span>
                </label>
              </li>

              <li className="sidebar-form__option">
                <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                  <input className="input-checkbox cursor-pointer" name="delivery" type="checkbox" />
                  <span className="input-label uppercase transition-all text-lg">truck</span>
                </label>
              </li>
            </ul>
          </div>

          <div className="sidebar-form__group">
            <h3 className="sidebar-form__group-title text-xl mb-1">
              Payment conditions:
            </h3>

            <ul className="sidebar-form__options">
              <li className="sidebar-form__option ">
                <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                  <input className="input-checkbox cursor-pointer" name="payment" type="checkbox" />
                  <span className="input-label uppercase transition-all text-lg">card</span>
                </label>
              </li>

              <li className="sidebar-form__option">
                <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                  <input className="input-checkbox cursor-pointer" name="payment" type="checkbox" />
                  <span className="input-label uppercase transition-all text-lg">cash</span>
                </label>
              </li>

              <li className="sidebar-form__option">
                <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                  <input className="input-checkbox cursor-pointer" name="payment" type="checkbox" />
                  <span className="input-label uppercase transition-all text-lg">free</span>
                </label>
              </li>
            </ul>
          </div>

          <div className="sidebar-form__group">
            <h3 className="sidebar-form__group-title text-xl mb-1">
              Waste types:
            </h3>

            <ul className="sidebar-form__options">
              <li className="sidebar-form__option ">
                <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                  <input className="input-checkbox cursor-pointer" name="waste-type" type="checkbox" />
                  <span className="input-label uppercase transition-all text-lg">glass</span>
                </label>
              </li>

              <li className="sidebar-form__option">
                <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                  <input className="input-checkbox cursor-pointer" name="waste-type" type="checkbox" />
                  <span className="input-label uppercase transition-all text-lg">paper</span>
                </label>
              </li>

              <li className="sidebar-form__option">
                <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                  <input className="input-checkbox cursor-pointer" name="waste-type" type="checkbox" />
                  <span className="input-label uppercase transition-all text-lg">plastic</span>
                </label>
              </li>

              <li className="sidebar-form__option">
                <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                  <input className="input-checkbox cursor-pointer" name="waste-type" type="checkbox" />
                  <span className="input-label uppercase transition-all text-lg">metals</span>
                </label>
              </li>

              <li className="sidebar-form__option">
                <label className="inline-flex cursor-pointer items-center sidebar-form__label">
                  <input className="input-checkbox cursor-pointer" name="waste-type" type="checkbox" />
                  <span className="input-label uppercase transition-all text-lg">electronic</span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <button className="sidebar-form__controls-button font-semibold bg-gradient-to-r from-blue-500 to-light-green rounded-lg transition-all hover:opacity-90 p-3" type="submit">
          Apply Filters
        </button>
      </form>
    </aside>
  );
}
