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
        path: '/dashboard',
        name: 'dashboard'
    },
    my_cats: {
        path: '/my-cats',
        name: 'my_cats'
    },
    tips: {
        path: '/tips',
        name: 'tips'
    },
    edit_cat: {
        path: '/my-cats/[:id]',
        name: 'edit_cat'
    },
    create_cat: {
        path: '/my-cats/new-cat',
        name: 'create_cat'
    }
};

export default links
