import {
    ABS_LOGISTICS_ACTIVITY,
    ABS_LOGISTICS_COMPANY_TYPE,
    ABS_LOGISTICS_CURRENCY,
    ABS_LOGISTICS_PAY_METHOD,
    ABS_LOGISTICS_OPTIONS,
    ABS_LOGISTICS_AGENT_URL,
    ABS_LOGISTICS_VAT_URL,
    ABS_LOGISTICS_ARTICLES_URL,
    ABS_LOGISTICS_CATEGORY,
    ABS_LOGISTICS_UNITS,
    ABS_LOGISTICS_CUSTOMER_URL,
    ABS_LOGISTICS_SUPPLIER_URL,
    ABS_LOGISTICS_DOCUMENT_URL,
    ABS_LOGISTICS_ORDER_ANOMALIES,
    ABS_LOGISTICS_TRANSPORTER_URL,
    ABS_LOGISTICS_DELIVERY_TIMES,
    ABS_LOGISTICS_AGENT_MERGE,
    ABS_LOGISTICS_SHIPMENT_MODES,
    ABS_LOGISTICS_PACKAGING_UNITS,
    ABS_LOGISTICS_INTERNAL_AGENTS_URL, ABS_LOGISTICS_UNITS_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const logisticsAdminNavTree: SideNavNode = {
    name: 'COMMON_LOGISTICS-ADMINISTRATION',
    icon: 'fas fa-users-cog',
    accessRights: 'LOGISTICS',
    children: [
        {
            name: 'LOGISTICS_DOCUMENT_NUMBERING',
            icon: 'fas fa-list-ol',
            route: ABS_LOGISTICS_DOCUMENT_URL,
            accessRights: 'Document'
        },
        {
            name: 'STOCK_ARTICLES',
            icon: 'fas fa-box',
            route: ABS_LOGISTICS_ARTICLES_URL,
            accessRights: 'Article'
        },
        {
            name: 'COMMON_AGENTS',
            icon: 'fas fa-user',
            route: ABS_LOGISTICS_AGENT_URL,
            accessRights: 'Agent'
        },
        {
            name: 'LOGISTICS_SUPPLIERS',
            icon: 'fa-solid fa-handshake',
            route: ABS_LOGISTICS_SUPPLIER_URL,
            accessRights: 'Supplier'
        },
        {
            name: 'LOGISTICS_CUSTOMERS',
            icon: 'fa-solid fa-cart-shopping',
            route: ABS_LOGISTICS_CUSTOMER_URL,
            accessRights: 'Customer'
        },
        {
            name: 'LOGISTICS_TRANSPORTERS',
            icon: 'fa-solid fa-van-shuttle',
            route: ABS_LOGISTICS_TRANSPORTER_URL,
            accessRights: 'Transporter'
        },
        {
            name: 'LOGISTICS_UNITS',
            icon: 'fa-solid fa-building-flag',
            route: ABS_LOGISTICS_UNITS_URL,
            accessRights: 'CUnit' //Company unit
        },
        {
            name: 'LOGISTICS_INTERNAL_AGENTS',
            icon: 'fa-solid fa-people-simple',
            route: ABS_LOGISTICS_INTERNAL_AGENTS_URL,
            accessRights: 'Internal'
        },
        {
            name: 'COMMON_VAT',
            icon: 'fas fa-percentage',
            route: ABS_LOGISTICS_VAT_URL,
            accessRights: 'VAT'
        },
        {
            name: 'COMMON_COMPANY_TYPES',
            icon: 'fas fa-building',
            route: ABS_LOGISTICS_COMPANY_TYPE,
            accessRights: 'Company'
        },
        {
            name: 'COMMON_ACTIVITIES',
            icon: "fa-solid fa-wave-pulse",
            route: ABS_LOGISTICS_ACTIVITY,
            accessRights: 'Activity'
        },
        {
            name: 'COMMON_CATEGORIES',
            icon: 'fa-solid fa-people-group',
            route: ABS_LOGISTICS_CATEGORY,
            accessRights: 'SalesCategory'
        },
        {
            name: 'LOGISTICS_PAY_METHOD',
            icon: 'fas fa-money-check-edit',
            route: ABS_LOGISTICS_PAY_METHOD,
            accessRights: 'MPay'
        },
        {
            name: 'COMMON_CURRENCIES',
            icon: 'fas fa-coins',
            route: ABS_LOGISTICS_CURRENCY,
            accessRights: 'Currency'
        },
        {
            name: 'COMMON_UNITS',
            icon: 'fa-solid fa-weight-hanging',
            route: ABS_LOGISTICS_UNITS,
            accessRights: 'Unit'
        },
        {
            name: 'LOGISTICS_PACKAGING_UNITS',
            icon: 'fa-solid fa-forklift',
            route: ABS_LOGISTICS_PACKAGING_UNITS,
            accessRights: 'PackagingUnit'
        },
        {
            name: 'LOGISTICS_DELIVERY_TIMES',
            icon: 'fa-solid fa-truck-bolt',
            route: ABS_LOGISTICS_DELIVERY_TIMES,
            accessRights: 'DeliveryTime'
        },
        {
            name: 'LOGISTICS_SHIPMENT_MODES',
            icon: 'fa-solid fa-ship',
            route: ABS_LOGISTICS_SHIPMENT_MODES,
            accessRights: 'ShipmentMode'
        },
        {
            name: 'LOGISTICS_AGENT_MERGE',
            icon: 'fa-solid fa-merge',
            route: ABS_LOGISTICS_AGENT_MERGE,
            accessRights: 'AgentMerge'
        },
        {
            name: 'LOGISTICS_ORDER_ANOMALIES',
            icon: 'fa-solid fa-circle-exclamation',
            route: ABS_LOGISTICS_ORDER_ANOMALIES,
            accessRights: 'POrder'
        },
        {
            name: 'COMMON_OPTIONS',
            icon: 'fas fa-coins',
            route: ABS_LOGISTICS_OPTIONS,
            accessRights: 'LogisticsOption'
        },
    ]
};
