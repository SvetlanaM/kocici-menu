import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/loading';

const isBrowser = () => typeof window !== 'undefined'

const ProtectedRoutes = ({ router, children }) => {
  const isAuthenticated = useAuth().isAuthenticated

  let unprotectedRoutes = [
    '/user/login',
    '/user/register',
  ];

  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

 
  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push('/user/login')
  }
 
  
  return children
}

export default ProtectedRoutes;