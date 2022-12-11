import React, { useState } from 'react';

import { BsPlusLg } from 'react-icons/Bs';

import { ServiceModal } from '../../components/ServiceModal/ServiceModal';
import { ServiceCard } from '../../components/ServiceCard/ServiceCard';
import { Header } from '../../components/Header/Header';

import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';

import { IService } from '../../models/service.model';
import { useGetProviderServices } from '../../hooks/providerServices';

export function ServicesPage({ isLoaded }: { isLoaded: boolean }) {
  const providerServices = useGetProviderServices();

  const [serviceForUpdate, setServiceForUpdate] = useState<IService>({} as IService);

  const popup = useAppSelector((store) => store.service.isPopupOpen);
  const updatePopup = useAppSelector((store) => store.service.isUpdatePopupOpen);

  const { setPopupState } = useActions();

  return (
    <>
      <Header />

      <div className="min-h-screen bg-light p-5">
        <div className="border-b-2 border-b-dark flex items-center justify-between pb-2 max-[500px]:flex-col">
          <h3 className="text-3xl font-bold pl-2 text-dark-green max-[500px]:text-xl">Your Services</h3>
          <button type="button" onClick={() => setPopupState(true)} className="flex items-center gap-2 mr-3 text-white bg-dark-green py-4 px-8 rounded-2xl font-semibold max-[500px]:text-sm max-[500px]:m-3">
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
          {providerServices && providerServices?.map((service: IService) => (
            <ServiceCard
              key={service.id}
              service={service}
              setServiceForUpdate={setServiceForUpdate}
            />
          ))}
        </div>
        <div />
      </div>
    </>
  );
}
