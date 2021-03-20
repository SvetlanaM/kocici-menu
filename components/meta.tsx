import Head from 'next/head';
import Link from 'next/link';

const Meta = () => {
  return (
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Quantico:wght@700&display=swap"
        rel="stylesheet"
      />
      <meta name="description" content={'Cat app'} />
    </Head>
  );
};

export default Meta;
