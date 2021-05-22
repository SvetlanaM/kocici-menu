import { useIdentityContext } from 'react-netlify-identity';
import { useEffect } from 'react';
import router, { useRouter } from 'next/router';
import React, { useLayoutEffect } from 'react'
import { getToken, setToken } from '../utils/token';
import { setUser } from '../utils/user';

const isBrowser = () => typeof window !== 'undefined'


export default function useAuth() {
  const auth = useIdentityContext();
  const { user } = auth;
  const router = useRouter();
  const page = router.pathname

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(String(user?.user_metadata.my_token))
      setUser(user?.id || '')
    }
  }, [auth, user, page]);
  return { isAuthenticated: auth && auth.isLoggedIn && auth.isConfirmedUser, user: user?.id, token: user?.user_metadata.my_token};
}

