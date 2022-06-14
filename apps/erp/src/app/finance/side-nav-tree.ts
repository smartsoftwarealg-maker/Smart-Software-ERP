import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_FINANCE_COMPENSATIONS, ABS_FINANCE_DASHBOARD_URL,
    ABS_FINANCE_PAYMENT_ORDERS,
    ABS_FINANCE_PAYMENTS, ABS_FINANCE_REPORTS_URL,
    ABS_PURCHASE_DASHBOARD_URL, ABS_PURCHASE_REPORTS_URL
} from '../common';

export const financeNavTree: SideNavNode = {
    name: 'COMMON_FINANCE',
    icon: 'fas fa-users-cog',
    accessRights: 'FINANCE',
    children: [
        {
            name: 'LOGISTICS_PAYMENT_ORDERS',
            icon: 'fas fa-credit-card-front',
            route: ABS_FINANCE_PAYMENT_ORDERS,
            accessRights: 'PaymentOrder'
        },
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
            name: 'COMMON_DASHBOARD',
            icon: 'fas fa-calendar-check',
            route: ABS_FINANCE_DASHBOARD_URL,
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fas fa-calendar-check',
            route: ABS_FINANCE_REPORTS_URL,
        },
    ]
};
