import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { setToken } from './token';
import { setUser } from './user';

const isBrowser = () => typeof window !== 'undefined';

const ProtectedRoutes = ({ router, children }) => {
  const { isAuthenticated, token, user } = useAuth();

  let unprotectedRoutes = [
    '/user/login',
    '/user/register',
    '/terms-and-conditions',
    '/gdpr-conditions',
  ];

  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push('/user/login');
    return null;
  }

  if (isBrowser()) {
    return children;
  }

  return null;
};

export default ProtectedRoutes;
