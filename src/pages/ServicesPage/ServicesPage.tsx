import React, { useState } from 'react';

import { BsPlusLg } from 'react-icons/Bs';

import { ServiceModal } from '../../components/ServiceModal/ServiceModal';
import { ServiceCard } from '../../components/ServiceCard/ServiceCard';

import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';

import { useGetServicesOfProviderQuery } from '../../redux/services/services';

import { IService } from '../../models/service.model';

export function ServicesPage({ isLoaded }: { isLoaded: boolean }) {
  const { data } = useGetServicesOfProviderQuery();

  const [serviceForUpdate, setServiceForUpdate] = useState<IService>({} as IService);

  const popup = useAppSelector((store) => store.service.isPopupOpen);
  const updatePopup = useAppSelector((store) => store.service.isUpdatePopupOpen);

  const { setPopupState } = useActions();

  return (
    <div className="min-h-screen bg-light p-5 pt-[90px]">
      <div className="border-b-2 border-b-dark flex items-center justify-between pb-2">
        <h3 className="text-3xl font-bold pl-2 text-dark-green">Your Services</h3>
        <button type="button" onClick={() => setPopupState(true)} className="flex items-center gap-2 mr-3 text-white bg-dark-green py-4 px-8 rounded-2xl font-semibold">
          Add Service
          <BsPlusLg />
        </button>
      </div>
      {popup && isLoaded && <ServiceModal />}
      {updatePopup && isLoaded && (
      <ServiceModal
        isUpdateService
        updateService={serviceForUpdate}
      />
      )}

      <div className="my-5 flex flex-col gap-3">
        {data && data?.map((service: IService) => (
          <ServiceCard
            key={service.id}
            service={service}
            setServiceForUpdate={setServiceForUpdate}
          />
        ))}
      </div>
      <div />
    </div>
  );
}
