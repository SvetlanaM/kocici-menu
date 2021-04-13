import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { ApiClient } from '../pages/_app';
import { setToken } from '../utils/token';


export default function useAuth(forceAuthenticated = true) {
  const auth0 = useAuth0();



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
      ApiClient.resetStore().then(() => {
      auth0.getAccessTokenSilently().then((token) => {
        setToken(token);
      })
    }).catch((error) => {
      console.log(error)
    })
  }, [auth0]);
  return auth0;
}

