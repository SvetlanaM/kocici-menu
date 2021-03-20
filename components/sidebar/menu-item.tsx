import Link from 'next/link';
import Image from 'next/image';

const MenuItem = ({ icon, name, url }) => {
  return (
    <Link href={url}>
      <a className="flex pt-8.5 px-8.5 text-purple-light">
        <div className="mr-5">
          <Image
            src={`/../public/icons/${icon}`}
            width={20}
            height={20}
            className="ml-5"
          />
        </div>
        {name}
      </a>
    </Link>
  );
};

export default MenuItem;
