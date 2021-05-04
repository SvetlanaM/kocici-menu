import Link from 'next/link';
import Image from '../components/image';
import { useState } from 'react';

interface MenuItemProps {
  icon: string;
  name: string;
  url: string;
  active: boolean;
}

const activeLinkStyle = 'text-purple-light';

const MenuItem = ({ icon, name, url, active }: MenuItemProps) => {
  const hoverIcon = `/icons/${icon}-purple.svg`;
  const basicIcon = `/icons/${icon}.svg`;
  const [isHover, setIsHover] = useState(basicIcon);

  const showHover = () => {
    setIsHover((prevState) => {
      if (prevState === basicIcon) {
        return hoverIcon;
      } else return basicIcon;
    });
  };

  return (
    <Link href={url}>
      <a
        className={`flex pt-6 text-gray-100 hover:${activeLinkStyle}`}
        onMouseEnter={showHover}
        onMouseLeave={showHover}
      >
        <div className="menu-icon">
          <Image
            src={active ? hoverIcon : isHover}
            width={20}
            height={20}
            className="ml-0 mr-5"
          />
        </div>
        <span className={active ? activeLinkStyle : ''}>{name}</span>
      </a>
    </Link>
  );
};

export default MenuItem;
