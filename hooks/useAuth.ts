import { useIdentityContext, User } from 'react-netlify-identity';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setToken } from '../utils/token';
import { setUser } from '../utils/user';
const jwt = require('jsonwebtoken');

const isBrowser = () => typeof window !== 'undefined';

const createJWT = (user_id) => {
  const secretKey =
    '-----BEGIN RSA PRIVATE KEY-----\n' +
    process.env.JWT_SECRET_KEY +
    '\n-----END RSA PRIVATE KEY-----';

  const payload = {
    sub: user_id,
    iat: 1516239022,
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['editor', 'user', 'mod'],
      'x-hasura-default-role': 'user',
      'x-hasura-user-id': user_id,
    },
  };

  const token = jwt.sign(payload, secretKey, {
    algorithm: 'RS256',
  });
  return token;
};

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
  const token = createJWT(user.id)

  setToken(token);
  setUser(user?.id || '');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(auth)
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
