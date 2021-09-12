import {
    ABS_LOGISTICS_PAYMENTS
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const financeNavTree: SideNavNode = {
        name: 'COMMON_FINANCE',
    icon: 'fas fa-users-cog',
    children: [
        {
            name: 'COMMON_PAYMENTS',
            icon: 'fas fa-coins',
            route: ABS_LOGISTICS_PAYMENTS,
            accessRights: 'Payment'
        },
    ]
};
