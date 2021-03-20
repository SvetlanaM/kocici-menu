import Link from 'next/link';

const TipSection = ({ title, link }) => {
  return (
    <Link href="/">
      <a>{title}</a>
    </Link>
  );
};

export default TipSection;
