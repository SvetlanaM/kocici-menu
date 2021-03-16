import { AppProps } from 'next/app';
import '../styles/globals.css';

import {
  ApolloClient,
  gql,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  headers: { 'x-hasura-admin-secret': 'catapp123' },
  uri: 'https://cat-react-backend.herokuapp.com/v1/graphql',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
