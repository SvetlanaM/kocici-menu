import { Router } from 'next/router';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
import { useEffect, useState } from 'react';

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
    '/',
  ];

  const pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const pathIsLogin =
    ['/', '/user/login', '/user/register'].indexOf(router.pathname) > -1;

  if (!isLoaded) {
    return <Loading />;
  }

  if (isAuthenticated) {
    if (pathIsLogin) {
      router.push('/dashboard');
      return <Loading />;
    } else {
      return children;
    }
  } else if (pathIsProtected) {
    router.push('/user/login');
    return <Loading />;
  } else {
    return children;
  }
};

export default ProtectedRoutes;
