import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { setToken } from '../utils/token';

export default function useAuth(forceAuthenticated = true) {
  const auth0 = typeof window === 'undefined' ? {} : useAuth0();
  useEffect(() => {
    if (auth0.isLoading) {
      return;
    }

    if (!auth0.isAuthenticated) {
      if (forceAuthenticated) {
        window.location.href = '/login';
      }
      return;
    }

    auth0.getAccessTokenSilently().then((token) => {
      setToken(token);
    });
  }, [auth0]);

  return { isLoading: auth0.isLoading };
}
