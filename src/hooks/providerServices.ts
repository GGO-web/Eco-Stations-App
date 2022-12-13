import { useEffect } from 'react';

import { useGetServicesOfProviderQuery } from '../redux/services/services';
import { useActions } from './actions';
import { useAppSelector } from './redux';

import { IService } from '../models/service.model';

export const useGetProviderServices = () => {
  const providerServices: IService[] = useAppSelector((store) => store.auth.services);

  const { data: allProviderServices } = useGetServicesOfProviderQuery();

  const { setServicesOfProvider } = useActions();

  useEffect(() => {
    if (allProviderServices) {
      const getAllServices = async () => {
        setServicesOfProvider(allProviderServices as IService[]);
      };

      getAllServices();
    }
  }, [allProviderServices]);

  return providerServices;
};
