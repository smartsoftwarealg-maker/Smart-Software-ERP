import {SideNavNode} from '@ss/common/api-common';
import {ABS_CUSTOMER_PROFILE, ABS_FOOD} from '../common';


export const foodNavTree: SideNavNode = {
    name: 'FOOD',
    icon: 'fa-solid fa-plate-utensils',
    children: [
        {
            name: 'LOGISTICS_SHOPPING_CART',
            icon: 'fas fa-balance-scale',
            route: ABS_FOOD,
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
