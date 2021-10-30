import { Router } from 'next/router';
import useAuth from '../hooks/useAuth';

const isBrowser = () => typeof window !== 'undefined';

interface ProtectedRoutesProps {
  router: Router;
  children: JSX.Element;
}
const ProtectedRoutes = ({
  router,
  children,
}: ProtectedRoutesProps): JSX.Element | null => {
  const { isAuthenticated } = useAuth();

  const unprotectedRoutes = [
    '/user/login',
    '/user/register',
    '/terms-and-conditions',
    '/gdpr-conditions',
    '/404',
  ];

  const pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push('/user/login');
    return null;
  }

  if (isBrowser() && isAuthenticated && router.pathname === '/') {
    router.push('/dashboard');
    return null;
  }

  return children;
};

export default ProtectedRoutes;
