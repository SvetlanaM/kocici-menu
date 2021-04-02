import Link from 'next/link';
import Image from 'next/image';

interface MenuItemProps {
  icon: string;
  name: string;
  url: string;
  active: boolean;
}

const activeLinkStyle = 'text-purple-light';

const MenuItem = ({ icon, name, url, active }: MenuItemProps) => {
  return (
    <Link href={url}>
      <a className={`flex pt-6 text-gray-100 hover:${activeLinkStyle}`}>
        <div className="mr-5 menu-icon">
          <Image
            src={`/icons/${icon}`}
            width={20}
            height={20}
            className="ml-5"
            priority
          />
        </div>
        <span className={active ? activeLinkStyle : ''}>{name}</span>
      </a>
    </Link>
  );
};

export default MenuItem;
