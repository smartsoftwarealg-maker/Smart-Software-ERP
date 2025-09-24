import {
    ABS_LOGISTICS_AGENT_URL,
    ABS_PURCHASE_DASHBOARD_URL,
    ABS_PURCHASE_ORDER_URL,
    ABS_PURCHASE_QUOTATION_URL,
    ABS_PURCHASE_RECEPTION_URL,
    ABS_PURCHASE_REPORTS_URL,
    ABS_PURCHASE_REQUEST_URL,
    ABS_ADMINISTRATION_WORKFLOW_INBOX_URL,
    ABS_STOCK_ARTICLES_URL,
    ABS_PURCHASE_RECEPTION_CANCELLATION_URL,
    ABS_IMPORT_PURCHASE_RECEPTION_URL,
    ABS_PURCHASE_REPORT_RIGHT_URL,
    ABS_PRICE_REQUEST_URL,
    ABS_FINANCE_SPAYMENTS,
    ABS_LOGISTICS_SUPPLIER_URL, ABS_PURCHASE_INVOICE_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const purchasesNavTree: SideNavNode = {
    name: 'PURCHASES',
    icon: 'fas fa-shopping-basket',
    accessRights: 'PURCHASES',
    children: [
        {
            name: 'STOCK_ARTICLES',
            icon: 'fas fa-box',
            route: ABS_STOCK_ARTICLES_URL,
            accessRights: 'Article'
        },
        {
            name: 'COMMON_AGENT',
            icon: 'fas fa-user',
            route: ABS_LOGISTICS_AGENT_URL,
            accessRights: 'Agent'
        },
        {
            name: 'LOGISTICS_SUPPLIER',
            icon: 'fa-solid fa-ship',
            route: ABS_LOGISTICS_SUPPLIER_URL,
            accessRights: 'Supplier'
        },
        {
            name: 'PURCHASES_PURCHASE_REQUEST',
            icon: 'fa-solid fa-basket-shopping-simple',
            route: ABS_PURCHASE_REQUEST_URL,
            accessRights: 'PRequest'
        },
        {
            name: 'PURCHASES_PRICE_REQUEST',
            icon: 'fa-solid fa-hand-holding-circle-dollar',
            route: ABS_PRICE_REQUEST_URL,
            accessRights: 'PriceRequest'
        },
        {
            name: 'PURCHASES_QUOTATION',
            icon: 'fas fa-quote-left',
            route: ABS_PURCHASE_QUOTATION_URL,
            accessRights: 'POffer'
        },
        {
            name: 'PURCHASES_PURCHASE_ORDER',
            icon: 'fas fa-money-check-alt',
            route: ABS_PURCHASE_ORDER_URL,
            accessRights: 'POrder'
        },
        {
            name: 'COMMON_RECEPTION',
            icon: 'fas fa-cart-arrow-down',
            route: ABS_PURCHASE_RECEPTION_URL,
            accessRights: 'Reception'
        },
        {
            name: 'COMMON_RECEPTION',
            icon: 'fas fa-cart-arrow-down',
            route: ABS_PURCHASE_RECEPTION_URL,
            accessRights: 'Reception'
        },
        {
            name: 'PURCHASES_PURCHASE_INVOICE',
            icon: 'fa-solid fa-file-invoice',
            route: ABS_PURCHASE_INVOICE_URL,
            accessRights: 'Reception'
        },
        {
            name: 'PURCHASES_IMPORT_PURCHASE_ORDER',
            icon: 'fa-solid fa-sailboat',
            route: ABS_IMPORT_PURCHASE_RECEPTION_URL,
            accessRights: 'Reception'
        },
        {
            name: 'STOCK_RECEPTION_CANCELLATION',
            icon: 'fa-solid fa-cart-minus',
            route: ABS_PURCHASE_RECEPTION_CANCELLATION_URL,
            accessRights: 'Reception'
        },
        {
            name: 'COMMON_PAYMENTS',
            icon: 'fas fa-coins',
            route: ABS_FINANCE_SPAYMENTS,
            accessRights: 'SPayment'
        },
        // {
        //     name: 'LOGISTICS_PAYMENT_COMPENSATION',
        //     icon: 'fa-solid fa-scale-balanced',
        //     route: ABS_FINANCE_SCOMPENSATIONS,
        //     accessRights: 'Accounting'
        // },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_PURCHASE_REPORTS_URL,
            accessRights: 'Report'
        },
        {
            name: 'COMMON_REPORT_RIGHTS',
            icon: 'fa-regular fa-ban',
            route: ABS_PURCHASE_REPORT_RIGHT_URL,
            accessRights: 'RoleReport'
        },
        {
            name: 'ADMINISTRATION_WORKFLOW_INBOX',
            icon: 'fa-solid fa-envelope',
            route: ABS_ADMINISTRATION_WORKFLOW_INBOX_URL,
            accessRights: 'MailBox'
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_PURCHASE_DASHBOARD_URL,
            accessRights: 'Dashboard'
        },
    ]
};
