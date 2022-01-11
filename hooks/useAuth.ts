import { useIdentityContext, User } from 'react-netlify-identity';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setToken } from '../utils/token';
import { setUser } from '../utils/user';
const LZString = require('lz-string')

const isBrowser = () => typeof window !== 'undefined';


export default function useAuth(): {
  isAuthenticated: boolean;
  user: string;
  token: string;
  user_data: User;
} {
  const auth = useIdentityContext();
  const { user } = auth;
  const router = useRouter();
  const page = router.pathname;

  const token = user?.app_metadata?.hasura_token && LZString.decompress(String(user?.app_metadata?.hasura_token))

  setToken(token);
  setUser(user?.id || '');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(auth)
      console.log(user?.app_metadata?.hasura_token)
      const token = LZString.decompress(String(user?.app_metadata?.hasura_token))
      setToken(token);
      setUser(user?.id || '');
    }
  }, [auth, user, page, isBrowser]);
  return {
    isAuthenticated: auth && auth.isLoggedIn && auth.isConfirmedUser,
    user: user?.id,
    token: token,
    user_data: user,
  };
}
