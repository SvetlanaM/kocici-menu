import Link from 'next/link';
import MenuItem from './menu-item';

const Sidebar = ({ menuLinks }): JSX.Element => {
  return (
    <aside className="bg-purple-darkest flex justify-between flex-col relative h-screen w-72 px-8.5">
      <div className="mt-9.5">
        <Link href="/">
          <a className="uppercase text-purple-dark font-bold font-logo text-lg">
            Cat App React
          </a>
        </Link>
        <nav className="font-normal">
          {Object.keys(menuLinks).map((link) => (
            <MenuItem
              icon={menuLinks[link].icon}
              name={menuLinks[link].name}
              url={menuLinks[link].url}
              key={menuLinks[link].name}
            />
          ))}
        </nav>
      </div>
      <div className="mb-5 font-medium py-1.5 text-center text-purple-light border rounded-1.2xl border-purple">
        <Link href="mailto:svetlana@margetova.eu">
          <a>Napíšte mi</a>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
