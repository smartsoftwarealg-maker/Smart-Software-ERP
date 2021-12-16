import {
    ABS_CART,
    ABS_CUSTOMER_PROFILE
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const cSpaceNavTree: SideNavNode[] =
    [
        {
            name: 'LOGISTICS_SHOPPING_CART',
            icon: 'fas fa-balance-scale',
            route: ABS_CART
        },
        {
            name: 'COMMON_PROFILE',
            icon: 'fas fa-file-chart-line',
            route: ABS_CUSTOMER_PROFILE
        }
    ];
