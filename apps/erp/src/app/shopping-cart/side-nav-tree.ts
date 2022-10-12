import {SideNavNode} from '@ss/common/api-common';
import {ABS_CART, ABS_CUSTOMER_PROFILE} from '../common';


export const shoppingCartNavTree: SideNavNode = {
    name: 'SHOPPING-CART',
    icon: 'fa-solid fa-cart-shopping',
    children: [
        {
            name: 'LOGISTICS_SHOPPING_CART',
            icon: 'fas fa-balance-scale',
            route: ABS_CART,
            accessRights: 'Cart',
            customerRights: {read: true, edit: false, delete: true, write: true}
        },
        {
            name: 'COMMON_PROFILE',
            icon: 'fas fa-file-chart-line',
            route: ABS_CUSTOMER_PROFILE,
            accessRights: 'Profile',
            customerRights: {read: true, edit: false, delete: true, write: true}
        }
    ],
    accessRights: 'SHOPPING-CART',
    customerRights: {read: true, edit: false, delete: true, write: true}
};
