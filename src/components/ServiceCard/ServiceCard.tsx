import React, { useEffect, useState } from 'react';

import { RiDeleteBin5Fill, RiEditFill } from 'react-icons/Ri';

import { v4 as uuidv4 } from 'uuid';
import { useDeleteExistingServiceMutation } from '../../redux/services/services';
import { useLazyGetAddressFromCoordinatesQuery } from '../../redux/services/maps';

import { IService } from '../../models/service.model';

import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { ServiceModal } from '../ServiceModal/ServiceModal';

export function ServiceCard({
  service,
}:{ service: IService }) {
  const [address, setAddress] = useState('');

  const {
    id, serviceName, typeOfWastes, deliveryOptions, paymentConditions, coordinate, description,
  } = service;

  const text = description ? JSON.parse(description as string)[0] : '';

  const { setUpdatePopupState } = useActions();

  const [getAddress] = useLazyGetAddressFromCoordinatesQuery();
  const [deleteService] = useDeleteExistingServiceMutation();

  const popup = useAppSelector((store) => store.service.isPopupOpen);
  const updatePopup = useAppSelector((store) => store.service.isUpdatePopupOpen);

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
    <>
      {popup && <ServiceModal />}
      {updatePopup && (
        <ServiceModal
          isUpdateService
          updateService={{ ...service, address }}
        />
      )}

      <div className="w-full md:grid gap-6 md:grid-cols-2 bg-main
    rounded-2xl min-h-[50px] text-white p-5"
      >
        <div className="w-full">
          <h3 className="text-2xl font-bold text-white pb-3">{serviceName}</h3>
          <p className="text-sm">{address}</p>
        </div>

        <div className="mb-2 md:mb-0 justify-self-end">
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

        <div className="w-full col-span-2 flex gap-8 justify-between">
          <div>
            <p>
              Description:
              {' '}
              {text}
            </p>
          </div>

          <div className="text-4xl flex gap-8">
            <RiEditFill
              className="cursor-pointer"
              onClick={() => {
                setUpdatePopupState(true);
              }}
            />

            <RiDeleteBin5Fill className="cursor-pointer" onClick={() => deleteService(id as number)} />
          </div>
        </div>
      </div>
    </>
  );
}
