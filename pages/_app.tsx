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

import { setContext } from '@apollo/client/link/context';

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => {
    const user = getUser();
    const token = getToken();

    return {
      headers: {
        Authorization: 'Bearer ' + token,
        user,
        ...headers,
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
  cache: new InMemoryCache({
    typePolicies: {
      Cat: {
        keyFields: ['id'],
      },
    },
  }),
  link: authMiddleware.concat(httpLink),
});

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <IdentityContextProvider url="https://gracious-yalow-39710f.netlify.app/">
      <ProtectedRoutes router={router}>
        <ApolloProvider client={ApiClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ProtectedRoutes>
    </IdentityContextProvider>
  );
}

export default MyApp;
