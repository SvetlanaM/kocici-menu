import Link from 'next/link';
import MenuItem from './menu-item';
import { MenuLinks } from './menu';
import { useRouter } from 'next/router';
import { APP_NAME, SVETA_EMAIL } from '../utils/constants';

const { items } = MenuLinks;

const Sidebar = () => {
  const router = useRouter();
  return (
    <aside className="relative h-screen w-72 flex-col-base justify-between px-8.5 bg-purple-darkest">
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
  );
};

export default Sidebar;
