import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_FINANCE_ADVANCEMENTS, ABS_FINANCE_BRANCHES,
    ABS_FINANCE_COMPENSATIONS, ABS_FINANCE_CPAYMENTS, ABS_FINANCE_CUSTOMER_COMPENSATIONS, ABS_FINANCE_DASHBOARD_URL,
    ABS_FINANCE_PAYMENT_ORDERS,
    ABS_FINANCE_PAYMENTS, ABS_FINANCE_REPORTS_URL, ABS_FINANCE_SPAYMENTS, ABS_FINANCE_SUPPLIER_COMPENSATIONS,
    ABS_PURCHASE_DASHBOARD_URL, ABS_PURCHASE_REPORTS_URL
} from '../common';

export const financeNavTree: SideNavNode = {
    name: 'COMMON_FINANCE',
    icon: 'fas fa-users-cog',
    accessRights: 'PAYMENTS',
    children: [
        {
            name: 'LOGISTICS_PAYMENT_ORDERS',
            icon: 'fas fa-credit-card-front',
            route: ABS_FINANCE_PAYMENT_ORDERS,
            accessRights: 'PaymentOrder'
        },
        {
            name: 'LOGISTICS_CUSTOMER_PAYMENTS',
            icon: 'fa-solid fa-cash-register',
            route: ABS_FINANCE_CPAYMENTS,
            accessRights: 'CPayment'
        },
        {
            name: 'LOGISTICS_SUPPLIER_PAYMENTS',
            icon: 'fa-solid fa-money-check-dollar-pen',
            route: ABS_FINANCE_SPAYMENTS,
            accessRights: 'SPayment'
        },
        {
            name: 'LOGISTICS_BRANCHES',
            icon: 'fa-solid fa-code-branch',
            route: ABS_FINANCE_BRANCHES,
            accessRights: 'Branch'
        },
        {
            name: 'LOGISTICS_SUPPLIER_COMPENSATION',
            icon: 'fa-solid fa-scale-unbalanced-flip',
            route: ABS_FINANCE_SUPPLIER_COMPENSATIONS,
            accessRights: 'SCompensation'
        },
        {
            name: 'LOGISTICS_CUSTOMER_COMPENSATION',
            icon: 'fa-solid fa-scale-unbalanced',
            route: ABS_FINANCE_CUSTOMER_COMPENSATIONS,
            accessRights: 'CCompensation'
        },
        {
            name: 'LOGISTICS_ADVANCEMENT_INVOICE',
            icon: 'fa-solid fa-coins',
            route: ABS_FINANCE_ADVANCEMENTS,
            accessRights: 'Advancement'
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_FINANCE_DASHBOARD_URL,
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fas fa-calendar-check',
            route: ABS_FINANCE_REPORTS_URL,
            accessRights: 'Report'
        },
    ]
};
