import React from 'react';

import { BsPlusLg } from 'react-icons/Bs';

import { ServiceCard } from '../../components/ServiceCard/ServiceCard';
import { Header } from '../../components/Header/Header';

import { useActions } from '../../hooks/actions';

import { IService } from '../../models/service.model';
import { useGetProviderServices } from '../../hooks/providerServices';

export function ServicesPage() {
  const providerServices = useGetProviderServices();

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

        <div className="my-5 flex flex-col gap-3">
          {providerServices && providerServices?.map((service: IService) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
        <div />
      </div>
    </>
  );
}
