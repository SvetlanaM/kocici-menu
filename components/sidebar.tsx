import Link from 'next/link';
import MenuItem from './menu-item';
import { MenuLinks } from './menu';
import { useRouter } from 'next/router';
import { APP_NAME, SVETA_EMAIL } from '../utils/constants';
import { useState } from 'react';
import Image from './image';

const { items } = MenuLinks;

const Sidebar = () => {
  const router = useRouter();
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsClosed(!isClosed);
  };

  return (
    <>
      <aside className="relative h-screen w-72 px-8.5 bg-purple-darkest hidden xl-custom:flex xl-custom:flex-col xl-custom:justify-between">
        <div className="mt-9.5">
          <Link href="/">
            <a className="font-logo font-bold text-lg uppercase text-purple-dark">
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
            <a>Napíšte mi</a>
          </Link>
        </div>
      </aside>
      <header className="w-full xl-custom:hidden bg-purple-darkest px-8 py-3 fixed z-20">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="font-logo font-bold text-lg uppercase text-purple-dark">
              {APP_NAME}
            </a>
          </Link>
          <a onClick={toggleMenu} className="cursor-pointer">
            <Image src={'/icons/hamburger.svg'} width={25} height={25} />
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
            <div className="mb-5 mt-2 py-1.5 border-rounded-base border-purple font-medium text-center text-purple-light transition duration-500 ease-in hover:bg-purple-light hover:text-white">
              <Link href={`mailto:${SVETA_EMAIL}`}>
                <a>Napíšte mi</a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Sidebar;
