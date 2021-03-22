import Link from 'next/link';

const TipSection = ({ title, link }) => {
  return (
    <div className="w-full pb-3.6 mb-4 border-b border-gray">
      <Link href="/">
        <a className="small-purple-text font-light more-info">
          1. Ako kŕmiť mačku v zime?{title}
        </a>
      </Link>
    </div>
  );
};

export default TipSection;
