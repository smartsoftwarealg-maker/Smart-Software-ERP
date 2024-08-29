import {
    ABS_STOCK_ACCOUNT_URL,
    ABS_STOCK_COST_CENTER_URL,
    ABS_STOCK_INVENTORY_ENTRY_URL,
    ABS_STOCK_INVENTORY_EXIT_URL,
    ABS_STOCK_CONSUMPTION_URL,
    ABS_STOCK_STORE_NAMES_URL,
    ABS_STORE_ASSIGNMENT_URL,
    ABS_INVENTORY_ANOMALIES_URL,
    ABS_STOCK_INVENTORY_URL,
    ABS_STOCK_REPORTS_URL,
    ABS_STOCK_DASHBOARD_URL,
    ABS_STOCK_TRANSFER_URL,
    ABS_STOCK_TRANSFER_RECEPTION_URL,
    ABS_LOGISTICS_AGENT_URL,
    ABS_USER_STORE_URL,
    ABS_STOCK_ARTICLES_URL,
    ABS_ADMINISTRATION_WORKFLOW_INBOX_URL,
    ABS_STOCK_CLASSES_URL,
    ABS_STOCK_GENERATION_ACCOUNT_URL,
    ABS_STOCK_STOCK_ACCOUNT_URL,
    ABS_INVENTORY_PRICE_RECALCULATION_URL,
    ABS_STOCK_CONSUMPTION_CANCELLATION_URL,
    ABS_STOCK_PARTS_REQUEST_URL,
    ABS_STOCK_REPORT_RIGHT_URL,
    ABS_REFERENCE_CORRECTION_URL,
    ABS_STOCK_RESERVATION_URL,
    ABS_STOCK_ARTICLE_TYPES_URL, ABS_STOCK_MARKS_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const stockNavTree: SideNavNode = {
    name: 'STOCK',
    icon: 'fas fa-warehouse-alt',
    accessRights: 'STOCK',
    children: [
        {
            name: 'COMMON_CLASSES',
            icon: 'fa-solid fa-family',
            route: ABS_STOCK_CLASSES_URL,
            accessRights: 'Klass'
        },
        {
            name: 'COMMON_TYPES',
            icon: 'fa-solid fa-people-roof',
            route: ABS_STOCK_ARTICLE_TYPES_URL,
            accessRights: 'ArticleType'
        },
        {
            name: 'COMMON_MARKS',
            icon: 'fa-solid fa-copyright',
            route: ABS_STOCK_MARKS_URL,
            accessRights: 'Mark'
        },
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
            name: 'LOGISTICS_ACCOUNTS',
            icon: 'fas fa-user-circle',
            route: ABS_STOCK_ACCOUNT_URL,
            accessRights: 'Account'
        },
        {
            name: 'ACC_STOCK_ACCOUNTS',
            icon: 'fa-solid fa-wind-turbine',
            route: ABS_STOCK_STOCK_ACCOUNT_URL,
            accessRights: 'Account'
        },
        {
            name: 'ACC_GENERATION_ACCOUNTS',
            icon: 'fa-thin fa-wind-turbine',
            route: ABS_STOCK_GENERATION_ACCOUNT_URL,
            accessRights: 'Account'
        },
        // {
        //     name: 'LOGISTICS_AGENT_PRICE',
        //     icon: 'fas fa-dollar-sign',
        //     route: ABS_STOCK_AGENT_PRICE_URL,
        //     accessRights: 'AgentPrice'
        // },
        {
            name: 'COMMON_COST_CENTER',
            icon: 'fas fa-building',
            route: ABS_STOCK_COST_CENTER_URL,
            accessRights: 'CostCenter'
        },
        {
            name: 'COMMON_STORE_NAMES',
            icon: 'fas fa-warehouse',
            route: ABS_STOCK_STORE_NAMES_URL,
            accessRights: 'Lot'
        },
        {
            name: 'STOCK_STORE_ASSIGNMENT',
            icon: 'fas fa-pallet',
            route: ABS_STORE_ASSIGNMENT_URL,
            accessRights: 'Store'
        },
        {
            name: 'STOCK_USER_STORES',
            icon: 'fa-solid fa-users-medical',
            route: ABS_USER_STORE_URL,
            accessRights: 'UserStore'
        },
        {
            name: 'COMMON_INVENTORYING',
            icon: 'fas fa-inventory',
            route: ABS_STOCK_INVENTORY_URL,
            accessRights: 'Inventory'
        },
        {
            name: 'STOCK_INVENTORY_ENTRY',
            icon: 'fas fa-truck-moving',
            route: ABS_STOCK_INVENTORY_ENTRY_URL,
            accessRights: 'InventoryIn'
        },
        {
            name: 'STOCK_INVENTORY_EXIT',
            icon: 'fas fa-dolly-flatbed',
            route: ABS_STOCK_INVENTORY_EXIT_URL,
            accessRights: 'InventoryOut'
        },
        {
            name: 'STOCK_CONSUMPTION',
            icon: 'fas fa-gas-pump',
            route: ABS_STOCK_CONSUMPTION_URL,
            accessRights: 'Consumption'
        },
        {
            name: 'LOGISTICS_RESERVATION',
            icon: 'fa-solid fa-lock-hashtag',
            route: ABS_STOCK_RESERVATION_URL,
            accessRights: 'Reservation'
        },
        {
            name: 'STOCK_PARTS_REQUEST',
            icon: 'fa-solid fa-car-battery',
            route: ABS_STOCK_PARTS_REQUEST_URL,
            accessRights: 'PartsRequest'
        },
        {
            name: 'STOCK_CONSUMPTION_CANCELLATION',
            icon: 'fa-solid fa-file-slash',
            route: ABS_STOCK_CONSUMPTION_CANCELLATION_URL,
            accessRights: 'Consumption'
        },
        {
            name: 'STOCK_TRANSFERS',
            icon: 'fa-solid fa-money-bill-transfer',
            route: ABS_STOCK_TRANSFER_URL,
            accessRights: 'Transfer'
        },
        {
            name: 'STOCK_TRANSFER_RECEPTIONS',
            icon: 'fa-solid fa-bag-shopping',
            route: ABS_STOCK_TRANSFER_RECEPTION_URL,
            accessRights: 'TransferReception'
        },
        {
            name: 'STOCK_ANOMALIES',
            icon: 'fas fa-tasks',
            route: ABS_INVENTORY_ANOMALIES_URL,
            accessRights: 'Article'
        },
        {
            name: 'STOCK_REFERENCE_CORRECTION',
            icon: 'fa-solid fa-check-double',
            route: ABS_REFERENCE_CORRECTION_URL,
            accessRights: 'Correction'
        },
        {
            name: 'STOCK_PRICE_RECALCULATION',
            icon: 'fa-solid fa-calculator',
            route: ABS_INVENTORY_PRICE_RECALCULATION_URL,
            accessRights: 'PriceCalc'
        },
        {
            name: 'COMMON_REPORT_RIGHTS',
            icon: 'fa-regular fa-ban',
            route: ABS_STOCK_REPORT_RIGHT_URL,
            accessRights: 'RoleReport'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_STOCK_REPORTS_URL,
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
            route: ABS_STOCK_DASHBOARD_URL,
            accessRights: 'DASHBOARD'
        },
    ]
};
