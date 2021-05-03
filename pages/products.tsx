import { useQuery, gql } from '@apollo/client';
import Layout from '../components/layout';
import Container from '../components/container';
import Sidebar from '../components/sidebar';
import Head from 'next/head';

export default function Products() {
  return (
    <Layout>
      <Head>
        <title></title>
      </Head>
      <Sidebar />
      <Container>{/* <Main>{() => null}</Main> */}</Container>
    </Layout>
  );
}
