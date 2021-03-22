import Layout from '../components/layout';
import Main from '../components/main';
import Container from '../components/container';
import Sidebar from '../components/sidebar/sidebar';
import Head from 'next/head';
import { item, menu, MenuItem } from './config';
import { GetCatsQuery } from '../generated/graphql';

const Common = ({
  data,
  menuKey,
}: {
  data: GetCatsQuery | null;
  menuKey: MenuItem;
}) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{item(menuKey).name}</title>
        </Head>
        <Sidebar menuLinks={menu} />
        <Container>
          <Main name={item(menuKey).componentName} data={data} />
        </Container>
      </Layout>
    </>
  );
};

export default Common;
