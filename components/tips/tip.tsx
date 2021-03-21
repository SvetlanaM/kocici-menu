import Link from 'next/link';

const TipSection = ({ title, link }) => {
  return (
    <div className="pb-3.6 mb-4 border-b border-gray w-full">
      <Link href="/">
        <a className="text-purple text-sm font-light more-info">
          1. Ako kŕmiť mačku v zime?{title}
        </a>
      </Link>
    </div>
  );
};

export default TipSection;
