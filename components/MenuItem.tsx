import Link from 'next/link';
import { useIdentityContext } from 'react-netlify-identity';
import router from 'next/router';
import useLogger from '../hooks/useLogger';
import { getUser } from '../utils/user';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';

interface MenuItemProps {
  icon: JSX.Element;
  name: string;
  url: string;
  active: boolean;
}

const MenuItem = ({ icon, name, url, active }: MenuItemProps): JSX.Element => {
  const { t } = useTranslation();
  const activeLinkStyle = 'text-purple-light';
  const { logoutUser } = useIdentityContext();
  const logger = useLogger();
  const userId = getUser();

  const logout = () => {
    logger(null, 'success', 'logout', userId && userId);
    logoutUser()
      .then(() => router.push('/user/login'))
      .catch((err) => {
        alert(t(cs['logout_error'])), logger(err);
      });
  };

  return name === 'logout' ? (
    <button onClick={logout}>
      <a
        className={`flex pt-6 text-gray-100 hover:text-purple-light ${
          active ? 'active-menu' : 'basic-menu'
        }`}
      >
        <div className="menu-icon ml-0 mr-5">{icon}</div>
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
