import Link from 'next/link';
import MenuItem from './menu-item';
import { getMenuItem } from '../config';
import { useRouter } from 'next/router';

const Sidebar = ({ menuLinks }): JSX.Element => {
  const router = useRouter();
  return (
    <aside className="relative h-screen w-72 flex-col-base justify-between px-8.5 bg-purple-darkest">
      <div className="mt-9.5">
        <Link href="/">
          <a className="font-logo font-bold text-lg uppercase text-purple-dark">
            Cat App React
          </a>
        </Link>
        <nav className="font-normal">
          {menuLinks.map((link) => (
            <MenuItem
              active={router.pathname === getMenuItem(link).url}
              icon={getMenuItem(link).icon}
              name={getMenuItem(link).name}
              url={getMenuItem(link).url}
              key={getMenuItem(link).name}
            />
          ))}
        </nav>
      </div>
      <div className="mb-5 py-1.5 border-rounded-base border-purple font-medium text-center text-purple-light">
        <Link href="mailto:svetlana@margetova.eu">
          <a>Napíšte mi</a>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
