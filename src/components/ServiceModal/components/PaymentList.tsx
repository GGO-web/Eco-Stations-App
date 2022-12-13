import React, { useState } from 'react';

import { IService } from '../../../models/service.model';

import { DeliveryOptions, PaymentConditions } from '../Options';

export function PaymentList({
  service, setService,
}: { service: IService, setService: Function }) {
  const DeliveryOptionsInitialCheckers = new Array(DeliveryOptions.length).fill(false);
  const PaymentConditionsInitialCheckers = new Array(PaymentConditions.length).fill(false);

  const [checkedStatePayment, setCheckedStatePayment] = useState(
    service.paymentConditions.length > 0
      ? PaymentConditions
        ?.map((pay: string, index: number) => (service.paymentConditions.includes(pay)
          ? DeliveryOptionsInitialCheckers[index] = true : false))
      : PaymentConditionsInitialCheckers,
  );

  const handleCheckPayment = (e: React.ChangeEvent<HTMLInputElement>, position: number) => {
    const updatedCheckedState = checkedStatePayment
      .map((item, index) => (index === position ? !item : item));

    setCheckedStatePayment(updatedCheckedState);

    let updatedList = [...service.paymentConditions];
    if (e.target.checked) {
      updatedList = [...service.paymentConditions, e.target.value];
    } else {
      updatedList.splice(service.paymentConditions.indexOf(e.target.value), 1);
    }
    setService({ ...service, paymentConditions: updatedList });
  };

  return (
    <div className="flex gap-4 items-center">
      {PaymentConditions.map((pay, index) => (
        <div className="flex items-center gap-1" key={pay}>
          <input
            value={pay}
            type="checkbox"
            onChange={(e) => handleCheckPayment(e, index)}
            checked={checkedStatePayment[index]}
            id="pay"
            className="input-checkbox cursor-pointer accent-dark-green"
          />
          <span>{pay}</span>
        </div>
      ))}
    </div>
  );
}
