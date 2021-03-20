import Link from 'next/link';
import MenuItem from './menu-item';
import ContactButton from './contact-button';

const Sidebar = ({ menuLinks }): JSX.Element => {
  return (
    <aside className="bg-purple-darkest relative h-screen w-72">
      <div className="pt-9.5 px-8.5">
        <Link href="/">
          <a className="uppercase text-purple-dark font-bold font-logo text-lg">
            Cat App React
          </a>
        </Link>
      </div>
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
      <div className="flex px-8">
        <ContactButton type="" value="" className="" />
      </div>
    </aside>
  );
};

export default Sidebar;
