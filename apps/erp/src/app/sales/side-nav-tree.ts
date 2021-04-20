import {SideNavNode} from '@ss/common/ui-shell';
import {
    ABS_SALES_DELIVERY_CANCEL_URL,
    ABS_SALES_DELIVERY_URL,
    ABS_SALES_INVOICE_CANCEL_URL,
    ABS_SALES_INVOICE_URL,
    ABS_SALES_ORDER_URL
} from '../common';


export const salesNavTree: SideNavNode = {
    name: 'SALES',
    icon: 'fas fa-truck',
    children: [
        {
            name: 'SALES_ORDER',
            icon: 'fas fa-cart-plus',
            route: ABS_SALES_ORDER_URL
        },
        {
            name: 'SALES_DELIVERY',
            icon: 'fas fa-file',
            route: ABS_SALES_DELIVERY_URL
        },
        {
            name: 'SALES_INVOICE',
            icon: 'fas fa-file-invoice',
            route: ABS_SALES_INVOICE_URL
        },
        {
            name: 'SALES_DELIVERY_CANCELLATION',
            icon: 'fas fa-undo-alt',
            route: ABS_SALES_DELIVERY_CANCEL_URL
        },
        {
            name: 'SALES_INVOICE_CANCELLATION',
            icon: 'fas fa-phone-slash',
            route: ABS_SALES_INVOICE_CANCEL_URL
        },
    ]
};
