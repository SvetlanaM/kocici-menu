import { AppProps } from 'next/app';
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { IdentityContextProvider } from 'react-netlify-identity';
import { getToken } from '../utils/token';
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
  const token = getToken();
  console.log(token);
  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers,
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
      <ProtectedRoutes router={router}>
        <ApolloProvider client={ApiClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ProtectedRoutes>
    </IdentityContextProvider>
  );
}

export default MyApp;

// export default appWithTranslation(MyApp);
