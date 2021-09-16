import i18next from 'i18next';
import cs from '../public/locales/cs/common.json';

export const MenuLinks = Object.freeze({
  items: [
    {
      icon: 'dashboard',
      url: '/dashboard',
      name: 'dashboard',
    },
    {
      icon: 'my_cats',
      url: '/my-cats',
      name: 'my_cats',
    },
    {
      icon: 'products',
      url: '/products',
      name: 'products_menu',
    },
    {
      icon: 'tips',
      url: '/tips',
      name: 'tips',
    },
    // {
    //   icon: 'fans',
    //   url: '',
    //   name: 'Fanúšikovia',
    // },
    {
      icon: 'settings',
      url: '/settings',
      name: 'settings',
    },
    {
      icon: 'logout',
      url: '',
      name: 'logout',
    },
  ],
});
