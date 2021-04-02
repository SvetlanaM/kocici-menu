import { AppProps } from 'next/app';
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';

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
    return {
      headers: {
        ...headers,
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_PASSWORD,
      },
    };
  });

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT,
  credentials: 'same-origin',
});

const ApiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink]),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={ApiClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default appWithTranslation(MyApp);
