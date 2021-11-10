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

  if (isLoaded) {
    if (!isAuthenticated && pathIsProtected) {
      router.replace('/user/login');
      return <Loading />;
    }

    if (
      isAuthenticated &&
      ['/', '/user/login', '/user/register'].indexOf(router.pathname) > -1
    ) {
      router.replace('/routing-path');
      return <Loading />;
    }

    return children;
  } else {
    return <Loading />;
  }
};

export default ProtectedRoutes;
