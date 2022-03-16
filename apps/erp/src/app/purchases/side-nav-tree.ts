import {
    ABS_FINANCE_PAYMENT_ORDERS,
    ABS_FINANCE_SCOMPENSATIONS, ABS_FINANCE_SPAYMENTS, ABS_PURCHASE_ORDER_URL, ABS_PURCHASE_QUOTATION_URL,
    ABS_PURCHASE_RECEPTION_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const purchasesNavTree: SideNavNode = {
    name: 'PURCHASES',
    icon: 'fas fa-shopping-basket',
    accessRights: 'PURCHASES',
    children: [
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
            icon: 'fas fa-coins',
            route: ABS_FINANCE_SCOMPENSATIONS,
            accessRights: 'Accounting'
        },
    ]
};
