import { AppProps } from 'next/app';
import '../styles/globals.css';
import { IdentityContextProvider } from 'react-netlify-identity';
import { getToken } from '../utils/token';
import { getUser } from '../utils/user';
import ProtectedRoutes from '../utils/protected-routes';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  from,
  HttpLink,
} from '@apollo/client';

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = getToken();
    const user = getUser();
    return {
      headers: {
        ...headers,
        user,
        Authorization: 'Bearer ' + token,
      },
    };
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT,
  credentials: 'include',
});

export const ApiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink]),
});

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <IdentityContextProvider url="https://gracious-yalow-39710f.netlify.app/">
      <ApolloProvider client={ApiClient}>
        <ProtectedRoutes router={router}>
          <Component {...pageProps} />
        </ProtectedRoutes>
      </ApolloProvider>
    </IdentityContextProvider>
  );
}

export default MyApp;
