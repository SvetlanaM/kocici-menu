import i18next from 'i18next';
import cs from '../public/locales/cs/common.json';

export const MenuLinks = Object.freeze({
  items: [
    {
      icon: 'dashboard',
      url: '/dashboard',
      name: 'Prehlad',
    },
    {
      icon: 'my_cats',
      url: '/my-cats',
      name: 'Moje macky',
    },
    {
      icon: 'products',
      url: '/products',
      name: 'Produkty',
    },
    {
      icon: 'tips',
      url: '/tips',
      name: 'Tipy',
    },
    // {
    //   icon: 'fans',
    //   url: '',
    //   name: 'Fanúšikovia',
    // },
    {
      icon: 'settings',
      url: '/settings',
      name: 'Nastavenia',
    },
    {
      icon: 'logout',
      url: '',
      name: 'Odhlasit sa',
    },
  ],
});
