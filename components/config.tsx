export const Config = Object.freeze({
  menuLinks: {
    dashboard: {
      icon: 'dashboard.svg',
      url: '/',
      name: 'Prehľad',
      componentName: './dashboard/main-wrapper',
    },
    myCats: {
      icon: 'my_cats.svg',
      url: '',
      name: 'Moje mačky',
      componentName: 'MyCatPage',
    },
    products: {
      icon: 'products.svg',
      url: '/products',
      name: 'Produkty',
      componentName: 'ProductsPage',
    },
    tips: {
      icon: 'tips.svg',
      url: '',
      name: 'Tipy',
      componentName: 'TipsPage',
    },
    fans: {
      icon: 'fans.svg',
      url: '',
      name: 'Fanúšikovia',
      componentName: 'FansPage',
    },
    settings: {
      icon: 'settings.svg',
      url: '',
      name: 'Nastavenia',
      componentName: 'SettingsPage',
    },
    logout: {
      icon: 'logout.svg',
      url: '',
      name: 'Odhlásiť sa',
      componentName: 'LogoutPage',
    },
  },
});
