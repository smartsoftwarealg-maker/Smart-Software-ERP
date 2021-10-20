import {
    ABS_FINANCE_COMPENSATIONS,
    ABS_FINANCE_PAYMENTS, ABS_FINANCE_SCOMPENSATIONS, ABS_FINANCE_SPAYMENTS,
    ABS_PURCHASE_ORDER_URL,
    ABS_PURCHASE_RECEPTION_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

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
