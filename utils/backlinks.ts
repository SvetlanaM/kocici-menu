import Breadcrumb from "./breadcrumb";

export enum BackLinkType {
    DASHBOARD = 'dashboard',
    MY_CATS = 'my_cats',
    TIPS = 'tips',
    EDIT_CAT = 'edit_cat',
    CREATE_CAT = 'create_cat'
}

const links: { [key in BackLinkType]: Breadcrumb } = {
    dashboard: {
        path: '/',
        name: 'Prehlaď'
    },
    my_cats: {
        path: '/my-cats',
        name: 'Moje mačky'
    },
    tips: {
        path: '/tips',
        name: 'Tipy'
    },
    edit_cat: {
        path: '/my-cats/[:id]',
        name: 'Upraviť mačku'
    },
    create_cat: {
        path: '/my-cats/new-cat',
        name: 'Pridať novú mačku'
    }
};

export default links
