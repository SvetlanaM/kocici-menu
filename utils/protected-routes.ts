import useAuth from '../hooks/useAuth';


const isBrowser = () => typeof window !== 'undefined'

const ProtectedRoutes = ({ router, children }) => {
  const { user, isAuthenticated } = useAuth()

  let unprotectedRoutes = [
    '/user/login',
    '/user/register',
  ];

  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

 
  if (isBrowser() && !isAuthenticated && pathIsProtected && !user) {
    router.push('/user/login')
  }
 
  
  return children
}

export default ProtectedRoutes;