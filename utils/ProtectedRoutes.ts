import router from 'next/router';
import useAuth from '../hooks/useAuth';

const isBrowser = () => typeof window !== 'undefined';

interface ProtectedRoutesProps {
  router: typeof router;
  children: React.ReactNode;
}
const ProtectedRoutes = ({
  router,
  children,
}: ProtectedRoutesProps): React.ReactNode | null => {
  const { isAuthenticated } = useAuth();

  const unprotectedRoutes = [
    '/user/login',
    '/user/register',
    '/terms-and-conditions',
    '/gdpr-conditions',
  ];

  const pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push('/user/login');
    return null;
  }

  return children;
};

export default ProtectedRoutes;
