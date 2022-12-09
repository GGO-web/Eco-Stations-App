import { useEffect } from 'react';

import { useLazyGetServicesOfProviderQuery } from '../redux/services/services';
import { useActions } from './actions';
import { useAppSelector } from './redux';

import { IService } from '../models/service.model';

export const useGetProviderServices = () => {
  const providerServices: IService[] = useAppSelector((store) => store.auth.services);

  const [getAllProviderServices] = useLazyGetServicesOfProviderQuery();

  const { setServicesOfProvider } = useActions();

  useEffect(() => {
    if (providerServices.length === 0) {
      const getAllServices = async () => {
        const providerAllServices = await getAllProviderServices().unwrap();

        setServicesOfProvider(providerAllServices);
      };

      getAllServices();
    }
  }, []);

  return providerServices;
};
