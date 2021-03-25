import DashboardPage from './dashboard/main-wrapper';

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
  componentName: ({ data }) => JSX.Element;
}

export function getMenuItem(item: MenuItem): MenuItemType {
  switch (item) {
    case MenuItem.Dashboard:
      return {
        icon: 'dashboard.svg',
        url: '/',
        name: 'Prehľad',
        componentName: DashboardPage,
      };
    case MenuItem.MyCats:
      return {
        icon: 'my_cats.svg',
        url: '',
        name: 'Moje mačky',
        componentName: DashboardPage,
      };
    case MenuItem.Products:
      return {
        icon: 'products.svg',
        url: '/products',
        name: 'Produkty',
        componentName: DashboardPage,
      };
    case MenuItem.Tips:
      return {
        icon: 'tips.svg',
        url: '',
        name: 'Tipy',
        componentName: DashboardPage,
      };
    case MenuItem.Fans:
      return {
        icon: 'fans.svg',
        url: '',
        name: 'Fanúšikovia',
        componentName: DashboardPage,
      };
    case MenuItem.Settings:
      return {
        icon: 'settings.svg',
        url: '',
        name: 'Nastavenia',
        componentName: DashboardPage,
      };
    case MenuItem.Logout:
      return {
        icon: 'logout.svg',
        url: '',
        name: 'Odhlásiť sa',
        componentName: DashboardPage,
      };
  }
}

export const menu = [
  MenuItem.Dashboard,
  MenuItem.MyCats,
  MenuItem.Products,
  MenuItem.Tips,
  MenuItem.Fans,
  MenuItem.Settings,
  MenuItem.Logout,
];
