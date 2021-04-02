import { useQuery, gql } from '@apollo/client';
import { GetCatsQuery } from '../generated/graphql';
import Layout from '../components/layout';
import Main from '../components/main';
import Container from '../components/container';
import Sidebar from '../components/sidebar';
import Head from 'next/head';
import { getMenuItem, menu, MenuItem } from '../components/menu';

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
