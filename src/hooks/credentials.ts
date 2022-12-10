import { useEffect } from 'react';

import { useActions } from './actions';
import { useLocalStorage } from './localStorage';

import { AUTH_CREDENTIALS } from '../constants';

import { ICredentials } from '../models/credentials.model';

export const useCredentials = () => {
  const [credentials, setCredentialsStore] = useLocalStorage<ICredentials>(AUTH_CREDENTIALS, {});

  const { setCredentials } = useActions();

  useEffect(() => {
    if (credentials.token) {
      setCredentials(credentials);
    }
  });

  return [credentials, setCredentialsStore] as const;
};
