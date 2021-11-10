import MyCats from '../public/icons/my_cats.svg';
import Dashboard from '../public/icons/dashboard.svg';
import Products from '../public/icons/products.svg';
import Tips from '../public/icons/tips.svg';
import Settings from '../public/icons/settings.svg';
import Logout from '../public/icons/logout.svg';

export const MenuLinks = Object.freeze({
  items: [
    {
      icon: <Dashboard />,
      url: '/dashboard',
      name: 'dashboard',
    },
    {
      icon: <MyCats />,
      url: '/my-cats',
      name: 'my_cats',
    },
    {
      icon: <Products />,
      url: '/products',
      name: 'products_menu',
    },
    {
      icon: <Tips />,
      url: '/tips',
      name: 'tips',
    },
    {
      icon: <Settings />,
      url: '/settings',
      name: 'settings',
    },
    {
      icon: <Logout />,
      url: '',
      name: 'logout',
    },
  ],
});
