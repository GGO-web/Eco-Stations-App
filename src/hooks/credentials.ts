import { useEffect } from 'react';

// import  { toast } from 'react-toastify';

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

      // toast.success('You have been Log In 😎', {
      //   toastId: 'error-msg',
      //   position: toast.POSITION.TOP_RIGHT,
      //   autoClose: 1500,
      // });
    }
  });

  return [credentials, setCredentialsStore] as const;
};
