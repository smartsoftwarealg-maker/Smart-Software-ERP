import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_ADMINISTRATION_WORKFLOW_INBOX_URL,
    ABS_SALES_AGENT_URL,
    ABS_SERVICE_CLASSES_URL,
    ABS_SALES_DASHBOARD_URL,
    ABS_SALES_DUPLICATION_URL,
    ABS_SALES_SERVICE_URL,
    ABS_SERVICE_INVOICE_CANCEL_URL,
    ABS_SERVICE_INVOICE_URL,
    ABS_SERVICE_ORDER_URL,
    ABS_SERVICE_PROFORMA_URL,
    ABS_SERVICE_REPORTS_URL,
    ABS_COMPLEMENT_INVOICE_URL,
    ABS_SERVICES_COMPENSATIONS,
    ABS_SERVICE_PAYMENTS
} from '../common';

export const ssalesNavTree: SideNavNode = {
    name: 'COMMON_SERVICES',
    icon: 'fa-solid fa-handshake',
    children: [
        {
            name: 'COMMON_CLASSES',
            icon: 'fa-solid fa-family',
            route: ABS_SERVICE_CLASSES_URL,
            accessRights: 'Klass'
        },
        {
            name: 'COMMON_AGENT',
            icon: 'fas fa-user',
            route: ABS_SALES_AGENT_URL,
            accessRights: 'Agent'
        },
        {
            name: 'COMMON_SERVICES',
            icon: 'fa-solid fa-handshake-simple',
            route: ABS_SALES_SERVICE_URL,
            accessRights: 'SService'
        },
        {
            name: 'LOGISTICS_PROFORMA',
            icon: 'fas fa-quote-right',
            route: ABS_SERVICE_PROFORMA_URL,
            accessRights: 'Proforma'
        },
        {
            name: 'SALES_ORDER',
            icon: 'fas fa-cart-plus',
            route: ABS_SERVICE_ORDER_URL,
            accessRights: 'SOrder'
        },
        // {
        //     name: 'COMMON_DELIVERY',
        //     icon: 'fas fa-file',
        //     route: ABS_SALES_DELIVERY_URL,
        //     accessRights: 'Delivery'
        // },
        {
            name: 'COMMON_INVOICE',
            icon: 'fas fa-file-invoice',
            route: ABS_SERVICE_INVOICE_URL,
            accessRights: 'Invoice'
        },
        {
            name: 'SALES_INVOICE_CANCELLATION',
            icon: 'fas fa-phone-slash',
            route: ABS_SERVICE_INVOICE_CANCEL_URL,
            accessRights: 'CInvoice'
        },
        {
            name: 'SALES_COMPLEMENT_INVOICE',
            icon: 'fas fa-file',
            route: ABS_COMPLEMENT_INVOICE_URL,
            accessRights: 'CInvoice'
        },
        {
            name: 'COMMON_PAYMENTS',
            icon: 'fas fa-coins',
            route: ABS_SERVICE_PAYMENTS,
            accessRights: 'Payment'
        },
        {
            name: 'LOGISTICS_PAYMENT_COMPENSATION',
            icon: 'fas fa-coins',
            route: ABS_SERVICES_COMPENSATIONS,
            accessRights: 'Accounting'
        },
        // {
        //     name: 'SALES_ADS',
        //     icon: 'fa-solid fa-eggplant',
        //     route: ABS_SALES_ADS,
        //     accessRights: 'ADS'
        // },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_SERVICE_REPORTS_URL,
            accessRights: 'Report'
        },
        {
            name: 'ADMINISTRATION_WORKFLOW_INBOX',
            icon: 'fa-solid fa-envelope',
            route: ABS_ADMINISTRATION_WORKFLOW_INBOX_URL,
            accessRights: 'MailBox'
        },
        {
            name: 'SALES_DUPLICATION',
            icon: 'fa-solid fa-copy',
            route: ABS_SALES_DUPLICATION_URL,
            accessRights: 'Invoice'
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_SALES_DASHBOARD_URL,
            accessRights: 'Dashboard'
        },
    ],
    accessRights: 'SALES'
};
