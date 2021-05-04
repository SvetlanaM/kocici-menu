import { useIdentityContext } from 'react-netlify-identity';
import { useEffect } from 'react';
import { ApiClient } from '../pages/_app';
import { setToken } from '../utils/token';

export default function useAuth() {
  const auth = useIdentityContext();
  console.log(auth);
  
  useEffect(() => {
    auth
  }, [auth]);
  return auth;
}

