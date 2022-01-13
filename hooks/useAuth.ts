import { useIdentityContext, User } from 'react-netlify-identity'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { setToken } from '../utils/token'
import { setUser } from '../utils/user'
const fetch = require('sync-fetch')

const isBrowser = () => typeof window !== 'undefined';

export default function useAuth(): {
  isAuthenticated: boolean;
  user: string;
  user_data: User;
} {
  const auth = useIdentityContext();
  const { user } = auth;
  const router = useRouter();
  const page = router.pathname;

  const getToken = (userID: string): string => {
    const json = fetch(`/api/token/${userID}`).json()
    let token = json['token'] as string
    if (!token) console.log(Error("Token missing"))
    return token
  }

  let token = user?.id && getToken(user.id)
  setToken(token)
  setUser(user?.id || '');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = user?.id && getToken(user.id)
      setToken(token)
      setUser(user?.id || '');
    }
  }, [auth, user, page, isBrowser]);

  return {
    isAuthenticated: auth && auth.isLoggedIn && auth.isConfirmedUser,
    user: user?.id,
    user_data: user,
  };
}
