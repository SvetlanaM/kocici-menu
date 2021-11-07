import Link from 'next/link';
import MenuItem from './MenuItem';
import { MenuLinks } from './Menu';
import { useRouter } from 'next/router';
import { APP_NAME, SVETA_EMAIL } from '../utils/constants';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
const { items } = MenuLinks;
import Image from 'next/image';

const Sidebar = (): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsClosed(!isClosed);
  };

  return (
    <>
      <aside className="relative h-screen w-72 px-8.5 bg-purple-darkest hidden xl-custom:flex xl-custom:flex-col xl-custom:justify-between">
        <div className="mt-9.5">
          <Link href="/">
            <a className="logo font-logo font-bold text-xl uppercase text-purple-dark">
              {APP_NAME}
            </a>
          </Link>
          <nav className="font-normal">
            {items.map((item) => (
              <MenuItem
                active={router.pathname === item.url}
                key={item.name}
                {...item}
              />
            ))}
          </nav>
        </div>
        <div className="mb-5 py-1.5 border-rounded-base border-purple font-medium text-center text-purple-light transition duration-500 ease-in hover:bg-purple-light hover:text-white">
          <Link href={`mailto:${SVETA_EMAIL}`}>
            <a>{t(cs['write_me_1'])}</a>
          </Link>
        </div>
      </aside>
      <header className="w-full xl-custom:hidden bg-purple-darkest px-8 py-3 z-20">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="logo font-logo font-bold text-lg uppercase text-purple-dark">
              {APP_NAME}
            </a>
          </Link>
          <a onClick={toggleMenu} className="cursor-pointer">
            <Image
              src={'/icons/hamburger.svg'}
              width={25}
              height={25}
              priority
            />
          </a>
        </div>
        <nav className={isClosed ? 'flex' : 'hidden'}>
          <div className="font-normal">
            {items.map((item) => (
              <MenuItem
                active={router.pathname === item.url}
                key={item.name}
                {...item}
              />
            ))}
            <div className="mb-5 mt-6 xl-custom:mt-2 py-1.5 border-rounded-base border-purple font-medium text-center text-purple-light transition duration-500 ease-in hover:bg-purple-light hover:text-white">
              <Link href={`mailto:${SVETA_EMAIL}`}>
                <a>{t(cs['write_me_1'])}</a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Sidebar;
