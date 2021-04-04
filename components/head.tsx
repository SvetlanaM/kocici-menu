import { React } from '@ungap/global-this';
import Head from 'next/head';

const Header = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Header;