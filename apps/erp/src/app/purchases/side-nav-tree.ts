import {SideNavNode} from '@ss/common/ui-shell';
import {ABS_PURCHASE_ORDER_URL, ABS_PURCHASE_RECEPTION_URL} from '../constants';

export const purchasesNavTree: SideNavNode = {
    name: 'PURCHASES',
    icon: 'fas fa-shopping-basket',
    children: [
        {
            name: 'PURCHASES_PURCHASE_ORDER',
            icon: 'fas fa-money-check-alt',
            route: ABS_PURCHASE_ORDER_URL
        },
        {
            name: 'PURCHASES_RECEPTION',
            icon: 'fas fa-cart-arrow-down',
            route: ABS_PURCHASE_RECEPTION_URL
        }
    ]
};
