import React, { ReactElement, useEffect } from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import { useCredentials } from '../../hooks/credentials';

export function ProtectedRoute(
  {
    element: childComponent,
    redirect = '/login',
    userRole = '',
  }: {
    element: ReactElement,
    redirect?: string,
    userRole?: string
  },
): React.ReactElement | null {
  const [credentials] = useCredentials();

  const navigate = useNavigate();

  useEffect(() => {
    if (!credentials.token || credentials.role !== userRole) {
      navigate(redirect);
    }
  });

  return childComponent as ReactElement;
}
