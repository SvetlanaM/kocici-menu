import Layout from '../components/layout';
import Main from '../components/main';
import Container from '../components/container';
import Sidebar from '../components/sidebar/sidebar';
import Head from 'next/head';
import { Config } from './config';

const Common = ({ menuKey }) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{Config.menuLinks[menuKey].name}</title>
        </Head>
        <Sidebar menuLinks={Config.menuLinks} />
        <Container>
          <Main name={Config.menuLinks[menuKey].componentName} />
        </Container>
      </Layout>
    </>
  );
};

export default Common;
