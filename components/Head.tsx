import Head from 'next/head';
interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Header;
