import { useIdentityContext, User } from 'react-netlify-identity'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { setToken } from '../utils/token'
import { setUser } from '../utils/user'

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

  const getToken = async (userID: string): Promise<string> => {
    return fetch(`api/token/${userID}`)
        .then(res => res.json())
        .then(data => {
          let token = data['token'] as string
          if (!token) throw new Error("Token missing")
          return token
        })
  }

  setUser(user?.id || '');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      user?.id && getToken(user.id)
          .then(token => setToken(token))
          .catch(err => console.log(err))
      setUser(user?.id || '');
    }
  }, [auth, user, page, isBrowser]);

  return {
    isAuthenticated: auth && auth.isLoggedIn && auth.isConfirmedUser,
    user: user?.id,
    user_data: user,
  };
}
