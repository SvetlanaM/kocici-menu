import Link from 'next/link';
import Image from 'next/image';

const MenuItem = ({ icon, name, url, active }) => {
  return (
    <Link href={url}>
      <a className="flex pt-6 text-purple-light">
        <div className="mr-5">
          <Image
            src={`/icons/${icon}`}
            width={20}
            height={20}
            className="ml-5"
          />
        </div>
        <span className={active ? 'underline' : ''}>{name}</span>
      </a>
    </Link>
  );
};

export default MenuItem;
