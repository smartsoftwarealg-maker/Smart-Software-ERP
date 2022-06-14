import {
    ABS_FINANCE_PAYMENT_ORDERS,
    ABS_FINANCE_SCOMPENSATIONS,
    ABS_FINANCE_SPAYMENTS,
    ABS_PAYROLL_DASHBOARD_URL, ABS_PURCHASE_DASHBOARD_URL,
    ABS_PURCHASE_ORDER_URL,
    ABS_PURCHASE_QUOTATION_URL,
    ABS_PURCHASE_RECEPTION_URL, ABS_PURCHASE_REPORTS_URL, ABS_STOCK_AGENT_URL, ABS_STOCK_REPORTS_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const purchasesNavTree: SideNavNode = {
    name: 'PURCHASES',
    icon: 'fas fa-shopping-basket',
    accessRights: 'PURCHASES',
    children: [
        {
            name: 'LOGISTICS_AGENT',
            icon: 'fas fa-user',
            route: ABS_STOCK_AGENT_URL,
            accessRights: 'Agent'
        },
        {
            name: 'PURCHASES_QUOTATION',
            icon: 'fas fa-quote-left',
            route: ABS_PURCHASE_QUOTATION_URL,
            accessRights: 'SOffer'
        },
        {
            name: 'PURCHASES_PURCHASE_ORDER',
            icon: 'fas fa-money-check-alt',
            route: ABS_PURCHASE_ORDER_URL,
            accessRights: 'POrder'
        },
        {
            name: 'PURCHASES_RECEPTION',
            icon: 'fas fa-cart-arrow-down',
            route: ABS_PURCHASE_RECEPTION_URL,
            accessRights: 'Reception'
        },
        {
            name: 'COMMON_PAYMENTS',
            icon: 'fas fa-coins',
            route: ABS_FINANCE_SPAYMENTS,
            accessRights: 'SPayment'
        },
        {
            name: 'LOGISTICS_PAYMENT_COMPENSATION',
            icon: 'fa-solid fa-scale-balanced',
            route: ABS_FINANCE_SCOMPENSATIONS,
            accessRights: 'Accounting'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fas fa-calendar-check',
            route: ABS_PURCHASE_REPORTS_URL,
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fas fa-calendar-check',
            route: ABS_PURCHASE_DASHBOARD_URL,
        },
    ]
};
