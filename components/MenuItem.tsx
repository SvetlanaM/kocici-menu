import Link from 'next/link';
import Image from './Image';
import { useState } from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import router from 'next/router';
import useLogger from '../hooks/useLogger';
import { getUser } from '../utils/user';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';

interface MenuItemProps {
  icon: string;
  name: string;
  url: string;
  active: boolean;
}

const MenuItem = ({ icon, name, url, active }: MenuItemProps): JSX.Element => {
  const { t } = useTranslation();
  const hoverIcon = `/icons/${icon}-purple.svg`;
  const basicIcon = `/icons/${icon}.svg`;
  const [isHover, setIsHover] = useState(basicIcon);
  const activeLinkStyle = 'text-purple-light';
  const { logoutUser } = useIdentityContext();
  const logger = useLogger();
  const userId = getUser();

  const showHover = () => {
    setIsHover((prevState) => {
      if (prevState === basicIcon) {
        return hoverIcon;
      } else return basicIcon;
    });
  };

  const logout = () => {
    logger(null, 'success', 'logout', userId && userId);
    logoutUser()
      .then(() => router.push('/user/login'))
      .catch((err) => {
        alert(t(cs['logout_error'])), logger(err);
      });
  };

  return icon === 'logout' ? (
    <button onClick={logout}>
      <a
        className={`flex pt-6 text-gray-100 hover:text-purple-light`}
        onMouseEnter={showHover}
        onMouseLeave={showHover}
        onFocus={() => setIsHover(hoverIcon)}
      >
        <div className="menu-icon">
          <Image
            src={active ? hoverIcon : isHover}
            width={20}
            height={20}
            className="ml-0 mr-5"
          />
        </div>
        <span className={active ? activeLinkStyle : ''}>{t(cs[name])}</span>
      </a>
    </button>
  ) : (
    <Link href={url}>
      <a
        className={`flex mt-6 text-gray-100 hover:text-purple-light ${
          active ? 'active-menu' : 'basic-menu'
        }`}
      >
        <div className="menu-icon ml-0 mr-5">{icon}</div>
        <span className={active ? activeLinkStyle : ''}>{t(cs[name])}</span>
      </a>
    </Link>
  );
};

export default MenuItem;
