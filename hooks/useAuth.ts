import { useIdentityContext } from 'react-netlify-identity';
import { useEffect } from 'react';


import { setToken } from '../utils/token';
import { setUser } from '../utils/user';


export default function useAuth() {
  const auth = useIdentityContext();
  const { user } = auth;
    

  useEffect(() => {
    if (typeof window !== 'undefined') {
    setToken(String(user?.user_metadata.my_token))
    setUser(user?.id || '')
  }
  }, [auth, user]);
  return { isAuthenticated: auth && auth.isLoggedIn && auth.isConfirmedUser, user: user };
}

