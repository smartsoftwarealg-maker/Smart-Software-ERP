import {
    ABS_ADMINISTRATION_WORKFLOW_INBOX_URL,
    ABS_FINANCE_CCOMPENSATIONS,
    ABS_FINANCE_CPAYMENTS, ABS_SALES_ADS,
    ABS_SALES_DASHBOARD_URL,
    ABS_SALES_DELIVERY_CANCEL_URL,
    ABS_SALES_DELIVERY_URL,
    ABS_SALES_INVOICE_CANCEL_URL,
    ABS_SALES_INVOICE_URL,
    ABS_SALES_ORDER_URL,
    ABS_SALES_PROFORMA_URL,
    ABS_SALES_REPORTS_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const salesNavTree: SideNavNode = {
    name: 'SALES',
    icon: 'fas fa-truck',
    children: [
        {
            name: 'LOGISTICS_PROFORMA',
            icon: 'fas fa-quote-right',
            route: ABS_SALES_PROFORMA_URL,
            accessRights: 'Proforma'
        },
        {
            name: 'SALES_ORDER',
            icon: 'fas fa-cart-plus',
            route: ABS_SALES_ORDER_URL,
            accessRights: 'SOrder'
        },
        {
            name: 'SALES_DELIVERY',
            icon: 'fas fa-file',
            route: ABS_SALES_DELIVERY_URL,
            accessRights: 'Delivery'
        },
        {
            name: 'SALES_INVOICE',
            icon: 'fas fa-file-invoice',
            route: ABS_SALES_INVOICE_URL,
            accessRights: 'Invoice'
        },
        {
            name: 'SALES_DELIVERY_CANCELLATION',
            icon: 'fas fa-undo-alt',
            route: ABS_SALES_DELIVERY_CANCEL_URL,
            accessRights: 'CDelivery'
        },
        {
            name: 'SALES_INVOICE_CANCELLATION',
            icon: 'fas fa-phone-slash',
            route: ABS_SALES_INVOICE_CANCEL_URL,
            accessRights: 'CInvoice'
        },
        {
            name: 'COMMON_PAYMENTS',
            icon: 'fas fa-coins',
            route: ABS_FINANCE_CPAYMENTS,
            accessRights: 'SPayment'
        },
        {
            name: 'LOGISTICS_PAYMENT_COMPENSATION',
            icon: 'fas fa-coins',
            route: ABS_FINANCE_CCOMPENSATIONS,
            accessRights: 'Accounting'
        },
        {
            name: 'SALES_ADS',
            icon: 'fa-solid fa-eggplant',
            route: ABS_SALES_ADS,
            accessRights: 'Accounting'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_SALES_REPORTS_URL,
            accessRights: 'Report'
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
            route: ABS_SALES_DASHBOARD_URL,
            accessRights: 'Dashboard'
        },
    ],
    accessRights: "SALES"
};
