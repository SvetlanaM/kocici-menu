import Link from 'next/link';
import Image from './Image';
import { useState } from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import router from 'next/router';
import { ApiClient } from '../pages/_app';
import useLogger from '../hooks/useLogger';
import { getUser } from '../utils/user';

interface MenuItemProps {
  icon: string;
  name: string;
  url: string;
  active: boolean;
}

const MenuItem = ({ icon, name, url, active }: MenuItemProps) => {
  const hoverIcon = `/icons/${icon}-purple.svg`;
  const basicIcon = `/icons/${icon}.svg`;
  const [isHover, setIsHover] = useState(basicIcon);
  const activeLinkStyle = 'text-purple-light';
  const { logoutUser } = useIdentityContext();

  const showHover = () => {
    setIsHover((prevState) => {
      if (prevState === basicIcon) {
        return hoverIcon;
      } else return basicIcon;
    });
  };

  const logger = useLogger();
  const userId = getUser();
  const logout = () => {
    logger(null, 'success', 'logout', userId && userId);
    logoutUser()
      .then(() => router.push('/user/login'))
      // .then(() => ApiClient.resetStore())
      .catch((err) => {
        alert('Nepodarilo sa uzivatela odhlasit '), logger(err);
      });
  };

  return icon === 'logout' ? (
    <button onClick={logout}>
      <a
        className={`flex pt-6 text-gray-100 hover:text-purple-light`}
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
    </button>
  ) : (
    <Link href={url}>
      <a
        className={`flex pt-6 text-gray-100 hover:text-purple-light`}
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
