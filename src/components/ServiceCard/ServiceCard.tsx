import React, { useEffect, useState } from 'react';

import { RiDeleteBin5Fill, RiEditFill } from 'react-icons/Ri';

import { v4 as uuidv4 } from 'uuid';
import { useDeleteExistingServiceMutation, useLazyGetAddressFromCoordinatesQuery } from '../../redux/services/services';

import { IService } from '../../models/service.model';

import { useActions } from '../../hooks/actions';

export function ServiceCard({
  service, setServiceForUpdate,
}:{ service: IService, setServiceForUpdate: Function }) {
  const [address, setAddress] = useState('');

  const {
    id, serviceName, typeOfWastes, deliveryOptions, paymentConditions, coordinate,
  } = service;

  const { setUpdatePopupState } = useActions();

  const [getAddress] = useLazyGetAddressFromCoordinatesQuery();
  const [deleteService] = useDeleteExistingServiceMutation();

  useEffect(() => {
    const serviceAddress = async () => {
      const adrs = await getAddress({
        lat: coordinate.latitude,
        lng: coordinate.longitude,
      }).unwrap();
      setAddress((adrs as any).results[0].formatted_address);
    };

    serviceAddress();
  }, []);

  return (
    <div className="w-full grid gap-8 grid-cols-3 bg-dark-green rounded-2xl min-h-[50px] text-white p-5 items-center">
      <div>
        <h3 className="text-2xl font-semibold">{serviceName}</h3>
        <p>{address}</p>
      </div>
      <div>
        <p className="pb-1">
          Types of waste:
          {' '}
          {typeOfWastes.map((type, index) => (
            <span
              key={uuidv4()}
            >
              {type}
              {index + 1 !== typeOfWastes.length && ', '}
            </span>
          ))}
        </p>
        <p className="pb-1">
          Delivery options:
          {' '}
          {deliveryOptions.map((option, index) => (
            <span key={uuidv4()}>
              {option}
              {index + 1 !== deliveryOptions.length && ', '}
            </span>
          ))}
        </p>
        <p>
          Payment Conditions:
          {' '}
          {paymentConditions.map((pay, index) => (
            <span key={uuidv4()}>
              {pay}
              {index + 1 !== paymentConditions.length && ', '}
            </span>
          ))}
        </p>
      </div>
      <div className="flex gap-8 text-4xl justify-self-end">
        <RiEditFill
          className="cursor-pointer"
          onClick={() => {
            setUpdatePopupState(true); setServiceForUpdate({
              ...{
                id,
                serviceName,
                typeOfWastes,
                deliveryOptions,
                paymentConditions,
                coordinate,
                address,
              },
            });
          }}
        />
        <RiDeleteBin5Fill className="cursor-pointer" onClick={() => deleteService(id as number)} />
      </div>
    </div>
  );
}
