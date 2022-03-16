import {SideNavNode} from '@ss/common/api-common';
import {ABS_FINANCE_COMPENSATIONS, ABS_FINANCE_PAYMENT_ORDERS, ABS_FINANCE_PAYMENTS} from '../common';

export const financeNavTree: SideNavNode = {
    name: 'COMMON_FINANCE',
    icon: 'fas fa-users-cog',
    accessRights: 'FINANCE',
    children: [
        {
            name: 'COMMON_PAYMENTS',
            icon: 'fas fa-coins',
            route: ABS_FINANCE_PAYMENTS,
            accessRights: 'Payment'
        },
        {
            name: 'LOGISTICS_PAYMENT_COMPENSATION',
            icon: 'fas fa-coins',
            route: ABS_FINANCE_COMPENSATIONS,
            accessRights: 'Accounting'
        },
        {
            name: 'LOGISTICS_PAYMENT_ORDERS',
            icon: 'fas fa-credit-card-front',
            route: ABS_FINANCE_PAYMENT_ORDERS,
            accessRights: 'PaymentOrder'
        },
    ]
};
