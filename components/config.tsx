export enum MenuItem {
  Dashboard,
  MyCats,
  Products,
  Tips,
  Fans,
  Settings,
  Logout,
}

interface MenuItemType {
  icon: string;
  url: string;
  name: string;
  componentName: string;
}

function getMenuItem(item: MenuItem): MenuItemType {
  switch (item) {
    case MenuItem.Dashboard:
      return {
        icon: 'dashboard.svg',
        url: '/',
        name: 'Prehľad',
        componentName: './dashboard/main-wrapper',
      };
    case MenuItem.MyCats:
      return {
        icon: 'my_cats.svg',
        url: '',
        name: 'Moje mačky',
        componentName: 'MyCatPage',
      };
    case MenuItem.Products:
      return {
        icon: 'products.svg',
        url: '/products',
        name: 'Produkty',
        componentName: 'ProductsPage',
      };
    case MenuItem.Tips:
      return {
        icon: 'tips.svg',
        url: '',
        name: 'Tipy',
        componentName: 'TipsPage',
      };
    case MenuItem.Fans:
      return {
        icon: 'fans.svg',
        url: '',
        name: 'Fanúšikovia',
        componentName: 'FansPage',
      };
    case MenuItem.Settings:
      return {
        icon: 'settings.svg',
        url: '',
        name: 'Nastavenia',
        componentName: 'SettingsPage',
      };
    case MenuItem.Logout:
      return {
        icon: 'logout.svg',
        url: '',
        name: 'Odhlásiť sa',
        componentName: 'LogoutPage',
      };
  }
}

export const item = getMenuItem;

export const menu = [
  MenuItem.Dashboard,
  MenuItem.MyCats,
  MenuItem.Products,
  MenuItem.Tips,
  MenuItem.Fans,
  MenuItem.Settings,
  MenuItem.Logout,
];
