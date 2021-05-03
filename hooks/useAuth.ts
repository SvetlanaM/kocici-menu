import { useEffect } from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import { ApiClient } from '../pages/_app';
import { setToken } from '../utils/token';

export default function useAuth(forceAuthenticated = true) {
  const auth = useIdentityContext();
  console.log(auth);

  useEffect(() => {
    // if (auth.isLoading) {
    //   return;
    // }
    // if (!auth.isAuthenticated) {
    //   if (forceAuthenticated) {
    //     window.location.href = '/login';
    //   }
    //   return;
    // }
    // ApiClient.resetStore()
    //   .then(() => {
    //     // auth.getAccessTokenSilently().then((token) => {
    //     // setToken(token);
    //     // });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [auth]);
  return auth;
}
